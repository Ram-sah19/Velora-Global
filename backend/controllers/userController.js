const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const { readLocalDb, writeLocalDb } = require('../db');
const { sendPasswordResetEmail, sendVerificationEmail, sendOtpEmail } = require('../services/emailService');
const { sendWhatsAppOtp } = require('../services/whatsappService');

// 30-Day Session Duration
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const SALT_ROUNDS = 10;

/**
 * Strips sensitive fields before sending user data to the client.
 */
function safeUser(user) {
  if (!user) return null;
  const u = user.toObject ? user.toObject() : { ...user };
  delete u.password;
  delete u.__v;
  return u;
}

function parseCookies(cookieHeader) {
  const list = {};
  if (!cookieHeader) return list;
  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });
  return list;
}

function create30DaySession(res, user) {
const sessionId = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + THIRTY_DAYS_MS).toISOString();

  const db = readLocalDb();
  if (!db.sessions) db.sessions = [];

  db.sessions.push({
    sessionId,
    userId: user.id,
    userEmail: user.email,
    expiresAt,
    isRevoked: false
  });
  writeLocalDb(db);

  const isProd = process.env.NODE_ENV === 'production';
  const cookieOptions = [
    `velora_refresh_token=${sessionId}`,
    `Path=/`,
    `Max-Age=${Math.floor(THIRTY_DAYS_MS / 1000)}`,
    `HttpOnly`,
    isProd ? `SameSite=None` : `SameSite=Lax`
  ];
  if (isProd) cookieOptions.push('Secure');

  res.setHeader('Set-Cookie', cookieOptions.join('; '));
  return sessionId;
}

exports.getCurrentUser = async (req, res) => {
  try {
    const cookies = parseCookies(req.headers.cookie);
    const sessionId = cookies.velora_refresh_token;

    if (!sessionId) {
      return res.status(401).json({ error: 'No active session found.' });
    }

    const db = readLocalDb();
    const session = (db.sessions || []).find(s => s.sessionId === sessionId && !s.isRevoked);

    if (!session) {
      return res.status(401).json({ error: 'Invalid or revoked session.' });
    }

    if (new Date(session.expiresAt) < new Date()) {
      return res.status(401).json({ error: 'Session expired.' });
    }

    let user;
    try {
      user = await User.findOne({ id: session.userId }).select('-password');
    } catch (e) {
      const localUser = (db.users || []).find(u => u.id === session.userId);
      if (localUser) {
        const { password, ...safe } = localUser;
        user = safe;
      }
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    const cookies = parseCookies(req.headers.cookie);
    const sessionId = cookies.velora_refresh_token;

    if (sessionId) {
      const db = readLocalDb();
      const session = (db.sessions || []).find(s => s.sessionId === sessionId);
      if (session) {
        session.isRevoked = true;
        writeLocalDb(db);
      }
    }

  const isProd = process.env.NODE_ENV === 'production';
  const sameSite = isProd ? 'SameSite=None' : 'SameSite=Lax';
  const secure = isProd ? '; Secure' : '';
  res.setHeader('Set-Cookie', `velora_refresh_token=; Path=/; Max-Age=0; HttpOnly; ${sameSite}${secure}`);
    res.json({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};

// Admin only — returns all users without passwords
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    const db = readLocalDb();
    const users = (db.users || []).map(u => { const { password, ...safe } = u; return safe; });
    res.json(users);
  }
};

// Admin only
exports.deleteUser = async (req, res) => {
  try {
    const rawId = req.params.id;
    const cleanId = decodeURIComponent(rawId || '').toLowerCase().trim();

    // 1. Delete from MongoDB Atlas
    try {
      const Application = require('../models/Application');
      const Task = require('../models/Task');

      const targetUser = await User.findOne({
        $or: [
          { id: rawId },
          { id: cleanId },
          { email: cleanId }
        ]
      });

      const targetEmail = targetUser ? targetUser.email.toLowerCase() : cleanId;
      const targetId = targetUser ? targetUser.id : rawId;

      await User.deleteMany({
        $or: [
          { id: targetId },
          { id: rawId },
          { id: cleanId },
          { email: targetEmail },
          { email: cleanId }
        ]
      });

      await Application.deleteMany({
        $or: [
          { studentId: targetId },
          { studentId: rawId },
          { studentEmail: targetEmail },
          { studentEmail: cleanId }
        ]
      });

      await Task.deleteMany({
        $or: [
          { studentId: targetId },
          { studentId: rawId },
          { studentEmail: targetEmail },
          { studentEmail: cleanId }
        ]
      });
    } catch (e) {}

    // 2. Delete from Local DB Store (db.json)
    const db = readLocalDb();
    if (db.users) {
      db.users = db.users.filter(u =>
        u.id !== rawId &&
        u.id !== cleanId &&
        (u.email || '').toLowerCase() !== cleanId
      );
    }
    if (db.applications) {
      db.applications = db.applications.filter(a =>
        a.studentId !== rawId &&
        a.studentId !== cleanId &&
        (a.studentEmail || '').toLowerCase() !== cleanId
      );
    }
    if (db.tasks) {
      db.tasks = db.tasks.filter(t =>
        t.studentId !== rawId &&
        t.studentId !== cleanId &&
        (t.studentEmail || '').toLowerCase() !== cleanId
      );
    }
    if (db.sessions) {
      db.sessions = db.sessions.filter(s =>
        s.userId !== rawId &&
        s.userId !== cleanId &&
        (s.userEmail || '').toLowerCase() !== cleanId
      );
    }
    writeLocalDb(db);

    console.log(`🗑️ Permanently deleted user [${rawId}] from MongoDB Atlas & db.json`);
    res.json({ message: 'User deleted successfully', userId: rawId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFounders = async (req, res) => {
  const SAFE_FIELDS = ['name', 'role', 'bio', 'avatar', 'userType'];
  function pickSafe(u) {
    const obj = u.toObject ? u.toObject() : { ...u };
    const safe = {};
    SAFE_FIELDS.forEach(f => { if (obj[f] !== undefined) safe[f] = obj[f]; });
    return safe;
  }
  try {
    const founders = await User.find({ userType: { $in: ['admin', 'superadmin'] } }).select(SAFE_FIELDS.join(' '));
    res.json(founders.map(pickSafe));
  } catch (err) {
    const db = readLocalDb();
    const founders = (db.users || [])
      .filter(u => u.userType === 'admin' || u.userType === 'superadmin')
      .map(pickSafe);
    res.json(founders);
  }
};

// Student Signup
// Student Signup
exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password, university, fieldOfStudy, skills, bio } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const emailClean = email.toLowerCase().trim();
    let existing;
    try {
      existing = await User.findOne({ email: emailClean });
    } catch (e) {
      const db = readLocalDb();
      existing = (db.users || []).find(u => u.email === emailClean);
    }

    if (existing) {
      return res.status(400).json({ error: 'An account with this email address is already registered. Please sign in.' });
    }

    // Require password
    if (!password || password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = {
      id: `user-student-${Date.now()}`,
      name,
      email: emailClean,
      password: hashedPassword,
      role: 'Student Candidate',
      userType: 'student',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      university: university || 'Not specified',
      fieldOfStudy: fieldOfStudy || 'General',
      skills: skills || [],
      bio: bio || 'Eager to gain real-world project experience with Velora Global.',
      isVerified: true
    };

    let savedUser = newUser;
    try {
      savedUser = await User.create(newUser);
    } catch (e) {
      const db = readLocalDb();
      db.users.push(newUser);
      writeLocalDb(db);
    }

    create30DaySession(res, savedUser);

    res.status(201).json({
      message: 'Account registered successfully! Welcome to Velora Global.',
      user: safeUser(savedUser)
    });
  } catch (err) {
    console.error('registerStudent error:', err);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
};

// Client Signup
exports.registerClient = async (req, res) => {
  try {
    const { name, companyName, email, phone, password } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and business email are required' });
    }

    const emailClean = email.toLowerCase().trim();
    let existing;
    try {
      existing = await User.findOne({ email: emailClean });
    } catch (e) {
      const db = readLocalDb();
      existing = (db.users || []).find(u => u.email === emailClean);
    }

    if (existing) {
      return res.status(400).json({ error: 'A corporate client account with this email address already exists. Please sign in.' });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newClient = {
      id: `user-client-${Date.now()}`,
      name,
      companyName: companyName || name,
      email: emailClean,
      phone: phone || '',
      password: hashedPassword,
      role: 'Corporate Client',
      userType: 'client',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      bio: `Corporate partner representing ${companyName || 'Enterprise Partner'}`,
      isVerified: true
    };

    let savedClient = newClient;
    try {
      savedClient = await User.create(newClient);
    } catch (e) {
      const db = readLocalDb();
      db.users.push(newClient);
      writeLocalDb(db);
    }

    create30DaySession(res, savedClient);

    res.status(201).json({
      message: 'Corporate client account registered successfully! Welcome to Velora Global.',
      user: safeUser(savedClient)
    });
  } catch (err) {
    console.error('registerClient error:', err);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
};

// Secret Super Admin Registration
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password, adminSecretKey } = req.body;

    const VALID_SECRET = process.env.ADMIN_SECRET_KEY;
    if (!VALID_SECRET || adminSecretKey !== VALID_SECRET) {
      return res.status(403).json({ error: 'Invalid Super Admin Registration Secret Key.' });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const emailClean = email.toLowerCase().trim();
    let existing;
    try {
      existing = await User.findOne({ email: emailClean });
    } catch (e) {
      const db = readLocalDb();
      existing = (db.users || []).find(u => u.email === emailClean);
    }

    if (existing) {
      return res.json({ message: 'Admin user already exists.', user: safeUser(existing) });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newAdmin = {
      id: `user-superadmin-${Date.now()}`,
      name,
      email: emailClean,
      password: hashedPassword,
      role: 'Super Admin Executive',
      userType: 'superadmin',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      bio: 'Platform Super Administrator with full system control, approval, and verification authority.',
      isVerified: true
    };

    let savedAdmin = newAdmin;
    try {
      savedAdmin = await User.create(newAdmin);
    } catch (e) {
      const db = readLocalDb();
      db.users.push(newAdmin);
      writeLocalDb(db);
    }

    create30DaySession(res, newAdmin);
    res.status(201).json({ message: 'Super Admin registered successfully', user: safeUser(savedAdmin) });
  } catch (err) {
    console.error('registerAdmin error:', err);
    res.status(500).json({ error: 'Admin registration failed. Please try again.' });
  }
};

// Unified Login Endpoint
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const emailClean = email.toLowerCase().trim();
    let user;

    // Always select password explicitly since it has select: false
    try {
      user = await User.findOne({ email: emailClean }).select('+password');
    } catch (e) {
      const db = readLocalDb();
      user = (db.users || []).find(u => u.email === emailClean);
    }

    if (!user) {
      return res.status(404).json({ error: 'Account not found with this email. Please sign up.' });
    }

    // Compare hashed password using bcrypt (bcrypt-only — no plaintext fallback)
    let passwordMatch = false;
    if (user.password) {
      passwordMatch = await bcrypt.compare(password, user.password);
    }

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password. Please try again.' });
    }

    create30DaySession(res, user);

    res.json({
      message: 'Login successful',
      user: safeUser(user)
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};

// ─── VERIFY 6-DIGIT OTP CODE (10-Minute Expiry) ────────────────────────────────
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otpCode } = req.body;
    if (!email || !otpCode) {
      return res.status(400).json({ error: 'Email and 6-digit code are required.' });
    }

    const emailClean = email.toLowerCase().trim();
    const cleanOtp = otpCode.toString().trim();
    const hashedOtp = crypto.createHash('sha256').update(cleanOtp).digest('hex');

    let user;
    try {
      user = await User.findOne({ email: emailClean }).select('+verificationOtp +verificationOtpExpiry');
    } catch (e) {
      const db = readLocalDb();
      user = (db.users || []).find(u => u.email === emailClean);
    }

    if (!user) {
      return res.status(404).json({ error: 'Account not found with this email address.' });
    }

    if (user.isVerified) {
      create30DaySession(res, user);
      return res.json({ message: 'Account is already verified!', user: safeUser(user) });
    }

    // Check 10-Minute OTP Expiry
    if (!user.verificationOtpExpiry || new Date(user.verificationOtpExpiry) < new Date()) {
      return res.status(400).json({ error: 'The 6-digit verification code has expired after 10 minutes. Please click "Resend Code".' });
    }

    // Match OTP — compare hashed value only (never plaintext)
    if (user.verificationOtp !== hashedOtp) {
      return res.status(400).json({ error: 'Incorrect 6-digit verification code. Please check your email and try again.' });
    }

    // Activate Account
    try {
      await User.updateOne(
        { email: emailClean },
        { isVerified: true, verificationOtp: null, verificationOtpExpiry: null }
      );
    } catch (e) {
      const db = readLocalDb();
      const localUser = (db.users || []).find(u => u.email === emailClean);
      if (localUser) {
        localUser.isVerified = true;
        localUser.verificationOtp = null;
        localUser.verificationOtpExpiry = null;
        writeLocalDb(db);
      }
    }

    user.isVerified = true;
    create30DaySession(res, user);

    res.json({
      message: 'Email verified successfully! Account activated.',
      user: safeUser(user)
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error during OTP verification.' });
  }
};

// ─── RESEND 6-DIGIT OTP CODE ──────────────────────────────────────────────────
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const emailClean = email.toLowerCase().trim();
    let user;
    try {
      user = await User.findOne({ email: emailClean }).select('+verificationOtp +verificationOtpExpiry');
    } catch (e) {
      const db = readLocalDb();
      user = (db.users || []).find(u => u.email === emailClean);
    }

    if (!user) {
      return res.json({ message: 'If that email is registered, a new 6-digit code has been sent.' });
    }

    if (user.isVerified) {
      return res.json({ message: 'This account is already verified. You can sign in.' });
    }

    const otpCode = crypto.randomInt(100000, 999999).toString();
    const hashedOtp = crypto.createHash('sha256').update(otpCode).digest('hex');
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    try {
      await User.updateOne(
        { email: emailClean },
        { verificationOtp: hashedOtp, verificationOtpExpiry: otpExpiry }
      );
    } catch (e) {
      const db = readLocalDb();
      const localUser = (db.users || []).find(u => u.email === emailClean);
      if (localUser) {
        localUser.verificationOtp = hashedOtp;
        localUser.verificationOtpExpiry = otpExpiry.toISOString();
        writeLocalDb(db);
      }
    }

    sendOtpEmail(emailClean, otpCode, user.name).catch(err => console.error('Failed to resend OTP email:', err.message));

    res.json({ message: 'A new 6-digit verification code has been sent to your email (valid for 10 minutes).' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to resend 6-digit verification code.' });
  }
};

// ─── SEND WHATSAPP PHONE OTP (NEPAL +977 & INDIA +91) ──────────────────────
exports.sendPhoneOtp = async (req, res) => {
  try {
    const { phone, countryCode = '+977', name = 'Candidate' } = req.body;
    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required.' });
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit mobile phone number.' });
    }

    const codePrefix = countryCode.startsWith('+') ? countryCode : `+${countryCode}`;
    const fullPhone = `${codePrefix}${cleanPhone}`;

    const otpCode = crypto.randomInt(100000, 999999).toString();
    const hashedOtp = crypto.createHash('sha256').update(otpCode).digest('hex');
    const expiry = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Store hashed OTP so verifyPhoneOtp can validate it
    const db = readLocalDb();
    if (!db.phoneOtps) db.phoneOtps = [];
    db.phoneOtps = db.phoneOtps.filter(o => o.phone !== fullPhone); // remove old entry
    db.phoneOtps.push({ phone: fullPhone, hashedOtp, expiry });
    writeLocalDb(db);

    const waResult = await sendWhatsAppOtp(cleanPhone, codePrefix, otpCode, name);

    res.json({
      message: `WhatsApp OTP sent successfully to ${fullPhone} (${codePrefix === '+977' ? 'Nepal' : 'India'})! Valid for 10 minutes.`,
      phone: fullPhone,
      countryCode: codePrefix,
      waLink: waResult.waLink
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send WhatsApp OTP code.' });
  }
};


// ─── VERIFY WHATSAPP PHONE OTP ──────────────────────────────────────────────
exports.verifyPhoneOtp = async (req, res) => {
  try {
    const { phone, countryCode = '+977', otpCode } = req.body;
    if (!phone || !otpCode) {
      return res.status(400).json({ error: 'Phone number and 6-digit WhatsApp code are required.' });
    }

    const cleanPhone = phone.replace(/\D/g, '');
    const cleanOtp = otpCode.toString().trim();
    const codePrefix = countryCode.startsWith('+') ? countryCode : `+${countryCode}`;

    // Look up stored OTP from DB
    const db = require('./db') ? null : null;
    let storedOtp = null;
    try {
      const u = await User.findOne({ phone: `${codePrefix}${cleanPhone}` }).select('+verificationOtp +verificationOtpExpiry');
      if (u) {
        storedOtp = u.verificationOtp;
        if (u.verificationOtpExpiry && new Date(u.verificationOtpExpiry) < new Date()) {
          return res.status(400).json({ error: 'OTP has expired. Please request a new code.' });
        }
      }
    } catch (e) {
      const { readLocalDb } = require('../db');
      const localDb = readLocalDb();
      const u = (localDb.phoneOtps || []).find(o => o.phone === `${codePrefix}${cleanPhone}`);
      if (u) {
        storedOtp = u.hashedOtp;
        if (u.expiry && new Date(u.expiry) < new Date()) {
          return res.status(400).json({ error: 'OTP has expired. Please request a new code.' });
        }
      }
    }

    if (!storedOtp) {
      return res.status(400).json({ error: 'No pending OTP found for this number. Please request a new code.' });
    }

    const hashedInput = require('crypto').createHash('sha256').update(cleanOtp).digest('hex');
    if (storedOtp !== hashedInput) {
      return res.status(400).json({ error: 'Incorrect OTP code. Please try again.' });
    }

    res.json({
      message: `Phone number ${codePrefix} ${cleanPhone} verified successfully!`,
      isPhoneVerified: true,
      phone: `${codePrefix} ${cleanPhone}`
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error during phone OTP verification.' });
  }
};

// ─── VERIFY EMAIL LINK ─────────────────────────────────────────────────────────────
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Verification token is required.' });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    let user;
    try {
      user = await User.findOne({
        verificationToken: hashedToken,
        verificationTokenExpiry: { $gt: new Date() }
      });
    } catch (e) {
      const db = readLocalDb();
      const now = new Date();
      user = (db.users || []).find(u =>
        u.verificationToken === hashedToken &&
        u.verificationTokenExpiry &&
        new Date(u.verificationTokenExpiry) > now
      );
    }

    if (!user) {
      return res.status(400).json({ error: 'Verification link is invalid or has expired. Please request a new verification email.' });
    }

    // Mark as verified
    try {
      await User.findOneAndUpdate(
        { verificationToken: hashedToken },
        { isVerified: true, verificationToken: null, verificationTokenExpiry: null }
      );
    } catch (e) {
      const db = readLocalDb();
      const localUser = (db.users || []).find(u => u.verificationToken === hashedToken);
      if (localUser) {
        localUser.isVerified = true;
        localUser.verificationToken = null;
        localUser.verificationTokenExpiry = null;
        writeLocalDb(db);
      }
    }

    user.isVerified = true;
    create30DaySession(res, user);

    res.json({
      message: 'Email verified successfully! Your account is now active.',
      user: safeUser(user)
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error during email verification.' });
  }
};

// ─── RESEND VERIFICATION EMAIL ────────────────────────────────────────────────
exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const emailClean = email.toLowerCase().trim();
    let user;
    try {
      user = await User.findOne({ email: emailClean });
    } catch (e) {
      const db = readLocalDb();
      user = (db.users || []).find(u => u.email === emailClean);
    }

    if (!user) {
      return res.json({ message: 'If that email is registered, a verification link has been sent.' });
    }

    if (user.isVerified) {
      return res.json({ message: 'This email is already verified. You can log in.' });
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    try {
      await User.findOneAndUpdate(
        { email: emailClean },
        { verificationToken: hashedToken, verificationTokenExpiry: expiry }
      );
    } catch (e) {
      const db = readLocalDb();
      const localUser = (db.users || []).find(u => u.email === emailClean);
      if (localUser) {
        localUser.verificationToken = hashedToken;
        localUser.verificationTokenExpiry = expiry.toISOString();
        writeLocalDb(db);
      }
    }

    const frontendUrl = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
    const verifyUrl = `${frontendUrl}?verifyToken=${rawToken}`;
    await sendVerificationEmail(emailClean, verifyUrl, user.name);

    res.json({ message: 'A new verification link has been sent to your email.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to resend verification email.' });
  }
};

// ─── FORGOT PASSWORD ──────────────────────────────────────────────────────────
// Generates a secure reset token, stores it, and emails the user a reset link.
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email address is required.' });
    }

    const emailClean = email.toLowerCase().trim();
    let user;
    try {
      user = await User.findOne({ email: emailClean });
    } catch (e) {
      const db = readLocalDb();
      user = (db.users || []).find(u => u.email === emailClean);
    }

    // Always respond with success even if email not found — prevents user enumeration
    if (!user) {
      return res.json({ message: 'If that email is registered, a reset link has been sent.' });
    }

    // Generate a secure random 32-byte token
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save hashed token + expiry to MongoDB
    try {
      await User.findOneAndUpdate(
        { email: emailClean },
        { resetToken: hashedToken, resetTokenExpiry: expiry }
      );
    } catch (e) {
      // Fallback to local db
      const db = readLocalDb();
      const localUser = (db.users || []).find(u => u.email === emailClean);
      if (localUser) {
        localUser.resetToken = hashedToken;
        localUser.resetTokenExpiry = expiry.toISOString();
        writeLocalDb(db);
      }
    }

    // Build the reset URL (raw token is in the URL — hashed version is stored in DB)
    const frontendUrl = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
    const resetUrl = `${frontendUrl}?resetToken=${rawToken}`;

    // Send the branded email
    try {
      await sendPasswordResetEmail(emailClean, resetUrl, user.name);
      console.log(`📧 Password reset email sent to ${emailClean}`);
    } catch (emailErr) {
      console.error('Email send failed:', emailErr.message);
      console.log(`🔑 [DEV FALLBACK RESET URL]: ${resetUrl}`);
      // In development mode, return success so testing isn't blocked by missing SMTP setup
      if (process.env.NODE_ENV !== 'production') {
        return res.json({ message: 'If that email is registered, a reset link has been sent.' });
      }
      return res.status(500).json({ error: 'Failed to send reset email. Please check your email configuration.' });
    }

    res.json({ message: 'If that email is registered, a reset link has been sent.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};

// ─── RESET PASSWORD ───────────────────────────────────────────────────────────
// Verifies the raw reset token against the stored hash, then sets the new password.
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Reset token and new password are required.' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    // Hash the incoming raw token to compare with stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    let user;
    try {
      user = await User.findOne({
        resetToken: hashedToken,
        resetTokenExpiry: { $gt: new Date() } // Token must not be expired
      }).select('+resetToken +resetTokenExpiry');
    } catch (e) {
      const db = readLocalDb();
      const now = new Date();
      user = (db.users || []).find(u =>
        u.resetToken === hashedToken &&
        u.resetTokenExpiry &&
        new Date(u.resetTokenExpiry) > now
      );
    }

    if (!user) {
      return res.status(400).json({ error: 'This reset link is invalid or has expired. Please request a new one.' });
    }

    // Hash the new password and clear the reset token
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    try {
      await User.findOneAndUpdate(
        { resetToken: hashedToken },
        {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null
        }
      );
    } catch (e) {
      const db = readLocalDb();
      const localUser = (db.users || []).find(u => u.resetToken === hashedToken);
      if (localUser) {
        localUser.password = hashedPassword;
        localUser.resetToken = null;
        localUser.resetTokenExpiry = null;
        writeLocalDb(db);
      }
    }

    // Revoke all existing sessions for this user so old sessions can't be used
    try {
      const db = readLocalDb();
      if (db.sessions) {
        db.sessions = db.sessions.map(s => {
          if (s.userId === user.id || s.userEmail === user.email) {
            return { ...s, isRevoked: true };
          }
          return s;
        });
        writeLocalDb(db);
      }
    } catch (e) {}

    res.json({ message: 'Password reset successful! You can now log in with your new password.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};
