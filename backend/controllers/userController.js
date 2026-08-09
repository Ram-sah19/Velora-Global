const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const { readLocalDb, writeLocalDb } = require('../db');
const { sendPasswordResetEmail, sendVerificationEmail } = require('../services/emailService');

// 30-Day Session Duration
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const SALT_ROUNDS = 12;

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
  const sessionId = `sess-${Date.now()}-${crypto.randomBytes(16).toString('hex')}`;
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

    res.setHeader('Set-Cookie', 'velora_refresh_token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax');
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
          { email: cleanId },
          { email: new RegExp(`^${cleanId}$`, 'i') }
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
  try {
    const founders = await User.find({ userType: { $in: ['admin', 'superadmin'] } }).select('-password');
    res.json(founders);
  } catch (err) {
    const db = readLocalDb();
    const founders = (db.users || [])
      .filter(u => u.userType === 'admin' || u.userType === 'superadmin')
      .map(u => { const { password, ...safe } = u; return safe; });
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
      return res.json({ message: 'User already registered. Please login.', user: safeUser(existing) });
    }

    // Hash password with bcrypt
    const rawPassword = password || 'student123';
    const hashedPassword = await bcrypt.hash(rawPassword, SALT_ROUNDS);

    // Generate Verification Token
    const rawVerifyToken = crypto.randomBytes(32).toString('hex');
    const hashedVerifyToken = crypto.createHash('sha256').update(rawVerifyToken).digest('hex');
    const verifyExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

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
      isVerified: false,
      verificationToken: hashedVerifyToken,
      verificationTokenExpiry: verifyExpiry
    };

    let savedUser = newUser;
    try {
      savedUser = await User.create(newUser);
    } catch (e) {
      const db = readLocalDb();
      db.users.push(newUser);
      writeLocalDb(db);
    }

    // Send email verification link
    const frontendUrl = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
    const verifyUrl = `${frontendUrl}?verifyToken=${rawVerifyToken}`;
    try {
      await sendVerificationEmail(emailClean, verifyUrl, name);
    } catch (err) {
      console.error('Failed to send verification email:', err.message);
    }

    res.status(201).json({
      message: 'Account created! Please check your email to verify your account before logging in.',
      requiresVerification: true,
      email: emailClean
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
      return res.json({ message: 'Client account already exists. Please login.', user: safeUser(existing) });
    }

    const rawPassword = password || 'client123';
    const hashedPassword = await bcrypt.hash(rawPassword, SALT_ROUNDS);

    // Generate Verification Token
    const rawVerifyToken = crypto.randomBytes(32).toString('hex');
    const hashedVerifyToken = crypto.createHash('sha256').update(rawVerifyToken).digest('hex');
    const verifyExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

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
      isVerified: false,
      verificationToken: hashedVerifyToken,
      verificationTokenExpiry: verifyExpiry
    };

    let savedClient = newClient;
    try {
      savedClient = await User.create(newClient);
    } catch (e) {
      const db = readLocalDb();
      db.users.push(newClient);
      writeLocalDb(db);
    }

    const frontendUrl = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
    const verifyUrl = `${frontendUrl}?verifyToken=${rawVerifyToken}`;
    try {
      await sendVerificationEmail(emailClean, verifyUrl, name);
    } catch (err) {
      console.error('Failed to send verification email:', err.message);
    }

    res.status(201).json({
      message: 'Account created! Please check your email to verify your account before logging in.',
      requiresVerification: true,
      email: emailClean
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Secret Super Admin Registration
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password, adminSecretKey } = req.body;

    const VALID_SECRET = process.env.ADMIN_SECRET_KEY || 'VELORA_SUPER_ADMIN_2026';
    if (adminSecretKey !== VALID_SECRET) {
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
    res.status(500).json({ error: err.message });
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

    // Compare hashed password using bcrypt
    let passwordMatch = false;
    if (user.password) {
      const isHashed = user.password.startsWith('$2b$') || user.password.startsWith('$2a$');
      if (isHashed) {
        passwordMatch = await bcrypt.compare(password, user.password);
      } else {
        // Legacy plain-text comparison (for existing users before migration)
        passwordMatch = user.password === password;
        if (passwordMatch) {
          // Upgrade plain-text password to bcrypt hash on successful login
          const newHash = await bcrypt.hash(password, SALT_ROUNDS);
          try {
            await User.updateOne({ email: emailClean }, { password: newHash });
          } catch (e) {
            const db = readLocalDb();
            const localUser = (db.users || []).find(u => u.email === emailClean);
            if (localUser) {
              localUser.password = newHash;
              writeLocalDb(db);
            }
          }
        }
      }
    }

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password. Please try again.' });
    }

    // Email Verification Guard (Except Admins / Superadmins)
    if (user.isVerified === false && user.userType !== 'superadmin' && user.userType !== 'admin') {
      return res.status(403).json({
        error: 'Please verify your email address before logging in. Check your inbox for the confirmation link.',
        requiresVerification: true,
        email: emailClean
      });
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

// ─── VERIFY EMAIL ─────────────────────────────────────────────────────────────
// Verifies user's email token and activates their account
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
