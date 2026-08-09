const path = require('path');
module.paths.push(path.join(__dirname, '../../backend/node_modules'));
module.paths.push(path.join(__dirname, '../backend/node_modules'));

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');
const fs = require('fs');
const crypto = require('crypto');

const User = require('./User');
const Session = require('./Session');

// Force IPv4 and set Public DNS for MongoDB Atlas SRV resolution
try {
  if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
  }
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

const app = express();
const PORT = process.env.USER_SERVICE_PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://ram6070246:4wA2e9P!5iM@velora.mongodb.net/velora?retryWrites=true&w=majority";

const DB_FILE = path.join(__dirname, 'users.json');
const SESSIONS_FILE = path.join(__dirname, 'sessions.json');

const readLocalUsers = () => {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
  } catch (e) {}
  return [
    {
      id: "user-admin-1",
      name: "Rambilas Sah",
      email: "rambilas@veloraglobal.com",
      role: "Founder & CEO",
      userType: "admin",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      bio: "Founder & CEO of Velora Global."
    },
    {
      id: "user-cofounder-1",
      name: "Puja Rouniyar",
      email: "puja@veloraglobal.com",
      role: "Co-Founder & COO",
      userType: "admin",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      bio: "Co-Founder driving operations at Velora Global."
    },
    {
      id: "user-cofounder-2",
      name: "Rohit Sah",
      email: "rohit@veloraglobal.com",
      role: "Co-Founder & CTO",
      userType: "admin",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      bio: "Co-Founder & Chief Technology Officer at Velora Global."
    }
  ];
};

const writeLocalUsers = (data) => {
  try { fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2)); } catch (e) {}
};

const readLocalSessions = () => {
  try {
    if (fs.existsSync(SESSIONS_FILE)) {
      return JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf8'));
    }
  } catch (e) {}
  return [];
};

const writeLocalSessions = (data) => {
  try { fs.writeFileSync(SESSIONS_FILE, JSON.stringify(data, null, 2)); } catch (e) {}
};

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      callback(null, true);
    } else {
      callback(null, origin);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());

// Helper function to parse raw Cookie header
function parseCookies(cookieHeader) {
  const list = {};
  if (!cookieHeader) return list;
  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });
  return list;
}

// 30-Day Session Duration (30 Days in Milliseconds)
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

async function create30DaySession(res, user) {
  const sessionId = `sess-${Date.now()}-${crypto.randomBytes(16).toString('hex')}`;
  const expiresAt = new Date(Date.now() + THIRTY_DAYS_MS);

  const sessionObj = {
    sessionId,
    userId: user.id,
    userEmail: user.email,
    userType: user.userType,
    expiresAt,
    isRevoked: false
  };

  try {
    await Session.create(sessionObj);
  } catch (e) {
    const sessions = readLocalSessions();
    sessions.push(sessionObj);
    writeLocalSessions(sessions);
  }

  // Set HttpOnly 30-Day Cookie
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

// Connect MongoDB Atlas
mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log('✅ User & Auth Service connected to MongoDB Atlas'))
  .catch(() => console.warn('⚠️ User & Auth Service running in JSON database fallback mode'));

// Health Check
app.get('/health', (req, res) => {
  res.json({ service: 'user-service', status: 'healthy', port: PORT, timestamp: new Date() });
});

// Get Current Logged-In User Profile via 30-Day HttpOnly Session Cookie
app.get('/api/users/me', async (req, res) => {
  try {
    const cookies = parseCookies(req.headers.cookie);
    const sessionId = cookies.velora_refresh_token;

    if (!sessionId) {
      return res.status(401).json({ error: 'No active session found.' });
    }

    let session;
    try {
      session = await Session.findOne({ sessionId, isRevoked: false });
    } catch (e) {
      session = readLocalSessions().find(s => s.sessionId === sessionId && !s.isRevoked);
    }

    if (!session) {
      return res.status(401).json({ error: 'Invalid or revoked session.' });
    }

    if (new Date(session.expiresAt) < new Date()) {
      return res.status(401).json({ error: 'Session expired. Please log in again.' });
    }

    let user;
    try {
      user = await User.findOne({ id: session.userId });
    } catch (e) {
      user = readLocalUsers().find(u => u.id === session.userId);
    }

    if (!user) {
      return res.status(404).json({ error: 'User account not found.' });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout Endpoint (Revokes Session & Clears HttpOnly Cookie)
app.post('/api/users/logout', async (req, res) => {
  try {
    const cookies = parseCookies(req.headers.cookie);
    const sessionId = cookies.velora_refresh_token;

    if (sessionId) {
      try {
        await Session.findOneAndUpdate({ sessionId }, { isRevoked: true });
      } catch (e) {
        const sessions = readLocalSessions();
        const sess = sessions.find(s => s.sessionId === sessionId);
        if (sess) {
          sess.isRevoked = true;
          writeLocalSessions(sessions);
        }
      }
    }

    // Clear HttpOnly Cookie
    res.setHeader('Set-Cookie', 'velora_refresh_token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax');
    res.json({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Domain Routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json(readLocalUsers());
  }
});

app.get('/api/users/founders', async (req, res) => {
  try {
    const founders = await User.find({ userType: { $in: ['admin', 'superadmin'] } });
    res.json(founders);
  } catch (err) {
    const users = readLocalUsers();
    res.json(users.filter(u => u.userType === 'admin' || u.userType === 'superadmin'));
  }
});

app.post('/api/users/register', registerStudent);
app.post('/api/users/register-student', registerStudent);
app.post('/api/users/register-client', registerClient);
app.post('/api/users/register-admin', registerAdmin);
app.post('/api/users/login', loginUser);

async function registerStudent(req, res) {
  try {
    const { name, email, password, university, fieldOfStudy, skills, bio } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

    const emailClean = email.toLowerCase().trim();
    let existing;
    try {
      existing = await User.findOne({ email: emailClean });
    } catch (e) {
      existing = readLocalUsers().find(u => u.email === emailClean);
    }

    if (existing) return res.json({ message: 'User already registered. Please login.', user: existing });

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
      const users = readLocalUsers();
      users.push(newUser);
      writeLocalUsers(users);
    }

    await create30DaySession(res, newUser);
    res.status(201).json({ message: 'Student registration successful', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function registerClient(req, res) {
  try {
    const { name, companyName, email, phone, password } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and business email are required' });

    const emailClean = email.toLowerCase().trim();
    let existing;
    try {
      existing = await User.findOne({ email: emailClean });
    } catch (e) {
      existing = readLocalUsers().find(u => u.email === emailClean);
    }

    if (existing) return res.json({ message: 'Client account already exists. Please login.', user: existing });

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
      const users = readLocalUsers();
      users.push(newClient);
      writeLocalUsers(users);
    }

    await create30DaySession(res, newClient);
    res.status(201).json({ message: 'Client registration successful', user: newClient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function registerAdmin(req, res) {
  try {
    const { name, email, password, adminSecretKey } = req.body;
    const VALID_SECRET = "VELORA_SUPER_ADMIN_2026";
    if (adminSecretKey !== VALID_SECRET) {
      return res.status(403).json({ error: 'Invalid Super Admin Registration Secret Key.' });
    }

    if (!name || !email || !password) return res.status(400).json({ error: 'Name, email, and password are required' });

    const emailClean = email.toLowerCase().trim();
    let existing;
    try {
      existing = await User.findOne({ email: emailClean });
    } catch (e) {
      existing = readLocalUsers().find(u => u.email === emailClean);
    }

    if (existing) return res.json({ message: 'Admin user already exists.', user: existing });

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
      const users = readLocalUsers();
      users.push(newAdmin);
      writeLocalUsers(users);
    }

    await create30DaySession(res, newAdmin);
    res.status(201).json({ message: 'Super Admin registered successfully', user: newAdmin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const emailClean = email.toLowerCase().trim();
    let user;
    try {
      user = await User.findOne({ email: emailClean });
    } catch (e) {
      user = readLocalUsers().find(u => u.email === emailClean);
    }

    if (!user) return res.status(404).json({ error: 'Account not found with this email. Please sign up.' });
    if (user.password && user.password !== password) return res.status(401).json({ error: 'Invalid password. Please try again.' });

    await create30DaySession(res, user);
    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

app.listen(PORT, () => {
  console.log(`🚀 User & Auth Microservice running on port ${PORT}`);
});
