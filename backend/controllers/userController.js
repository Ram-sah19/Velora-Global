const crypto = require('crypto');
const User = require('../models/User');
const { readLocalDb, writeLocalDb } = require('../db');

// 30-Day Session Duration (30 Days in Milliseconds)
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

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

  const cookieOptions = [
    `velora_refresh_token=${sessionId}`,
    `Path=/`,
    `Max-Age=${Math.floor(THIRTY_DAYS_MS / 1000)}`,
    `HttpOnly`,
    `SameSite=Lax`
  ];
  if (process.env.NODE_ENV === 'production') cookieOptions.push('Secure');

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
      user = await User.findOne({ id: session.userId });
    } catch (e) {
      user = (db.users || []).find(u => u.id === session.userId);
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    const db = readLocalDb();
    res.json(db.users || []);
  }
};

exports.getFounders = async (req, res) => {
  try {
    const founders = await User.find({ userType: { $in: ['admin', 'superadmin'] } });
    res.json(founders);
  } catch (err) {
    const db = readLocalDb();
    const founders = (db.users || []).filter(u => u.userType === 'admin' || u.userType === 'superadmin');
    res.json(founders);
  }
};

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
      return res.json({ message: 'User already registered. Please login.', user: existing });
    }

    const newUser = {
      id: `user-student-${Date.now()}`,
      name,
      email: emailClean,
      password: password || 'student123',
      role: 'Student Candidate',
      userType: 'student',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      university: university || 'Not specified',
      fieldOfStudy: fieldOfStudy || 'General',
      skills: skills || [],
      bio: bio || 'Eager to gain real-world project experience with Velora Global.'
    };

    try {
      await User.create(newUser);
    } catch (e) {
      const db = readLocalDb();
      db.users.push(newUser);
      writeLocalDb(db);
    }

    create30DaySession(res, newUser);
    res.status(201).json({ message: 'Student registration successful', user: newUser });
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
      return res.json({ message: 'Client account already exists. Please login.', user: existing });
    }

    const newClient = {
      id: `user-client-${Date.now()}`,
      name,
      companyName: companyName || name,
      email: emailClean,
      phone: phone || '',
      password: password || 'client123',
      role: 'Corporate Client',
      userType: 'client',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      bio: `Corporate partner representing ${companyName || 'Enterprise Partner'}`
    };

    try {
      await User.create(newClient);
    } catch (e) {
      const db = readLocalDb();
      db.users.push(newClient);
      writeLocalDb(db);
    }

    create30DaySession(res, newClient);
    res.status(201).json({ message: 'Client registration successful', user: newClient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Secret Super Admin Registration
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password, adminSecretKey } = req.body;
    
    const VALID_SECRET = "VELORA_SUPER_ADMIN_2026";
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
      return res.json({ message: 'Admin user already exists.', user: existing });
    }

    const newAdmin = {
      id: `user-superadmin-${Date.now()}`,
      name,
      email: emailClean,
      password,
      role: 'Super Admin Executive',
      userType: 'superadmin',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      bio: 'Platform Super Administrator with full system control, approval, and verification authority.'
    };

    try {
      await User.create(newAdmin);
    } catch (e) {
      const db = readLocalDb();
      db.users.push(newAdmin);
      writeLocalDb(db);
    }

    create30DaySession(res, newAdmin);
    res.status(201).json({ message: 'Super Admin registered successfully', user: newAdmin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Unified Login Endpoint (Student, Client, Admin, Superadmin)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const emailClean = email.toLowerCase().trim();
    let user;
    try {
      user = await User.findOne({ email: emailClean });
    } catch (e) {
      const db = readLocalDb();
      user = (db.users || []).find(u => u.email === emailClean);
    }

    if (!user) {
      return res.status(404).json({ error: 'Account not found with this email. Please sign up.' });
    }

    if (user.password && user.password !== password) {
      return res.status(401).json({ error: 'Invalid password. Please try again.' });
    }

    create30DaySession(res, user);

    res.json({
      message: 'Login successful',
      token: `jwt_token_velora_${user.id}_${Date.now()}`,
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
