const User = require('../models/User');
const { readLocalDb, writeLocalDb } = require('../db');

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

    res.status(201).json({ message: 'Client registration successful', user: newClient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Secret Super Admin Registration
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password, adminSecretKey } = req.body;
    
    // Secret Key validation for authorized Super Admin creation
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

    // Check password if set
    if (user.password && user.password !== password) {
      return res.status(401).json({ error: 'Invalid password. Please try again.' });
    }

    res.json({
      message: 'Login successful',
      token: `jwt_token_velora_${user.id}_${Date.now()}`,
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
