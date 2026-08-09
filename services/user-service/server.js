require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');
const fs = require('fs');
const path = require('path');

const User = require('./User');

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
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (e) {}
};

app.use(cors());
app.use(express.json());

// Connect MongoDB Atlas
mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log('✅ User & Auth Service connected to MongoDB Atlas'))
  .catch(() => console.warn('⚠️ User & Auth Service running in JSON database fallback mode'));

// Health Check
app.get('/health', (req, res) => {
  res.json({ service: 'user-service', status: 'healthy', port: PORT, timestamp: new Date() });
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

    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

app.listen(PORT, () => {
  console.log(`🚀 User & Auth Microservice running on port ${PORT}`);
});
