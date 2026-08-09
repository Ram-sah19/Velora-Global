const path = require('path');
module.paths.push(path.join(__dirname, '../../backend/node_modules'));
module.paths.push(path.join(__dirname, '../backend/node_modules'));

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');
const fs = require('fs');

const Application = require('./Application');

// Force IPv4 and set Public DNS for MongoDB Atlas SRV resolution
try {
  if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
  }
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

const app = express();
const PORT = process.env.APPLICATION_SERVICE_PORT || 5003;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://ram6070246:4wA2e9P!5iM@velora.mongodb.net/velora?retryWrites=true&w=majority";

const DB_FILE = path.join(__dirname, 'applications.json');

const readLocalApps = () => {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
  } catch (e) {}
  return [];
};

const writeLocalApps = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (e) {}
};

function calculateDurationDays(durationStr = '') {
  const str = (durationStr || '').toLowerCase().trim();
  if (str.includes('1 week') || str.includes('1w')) return 7;
  if (str.includes('2 week') || str.includes('2w')) return 14;
  if (str.includes('3 week') || str.includes('3w')) return 21;
  if (str.includes('1 month') || str.includes('1m')) return 30;
  if (str.includes('2 month') || str.includes('2m')) return 60;
  if (str.includes('3 month') || str.includes('3m')) return 90;
  if (str.includes('6 month') || str.includes('6m')) return 180;
  return 30;
}

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

// Connect MongoDB Atlas
mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log('✅ Application & Access Service connected to MongoDB Atlas'))
  .catch(() => console.warn('⚠️ Application & Access Service running in JSON database fallback mode'));

// Health Check
app.get('/health', (req, res) => {
  res.json({ service: 'application-service', status: 'healthy', port: PORT, timestamp: new Date() });
});

// Domain Routes
app.get('/api/applications', async (req, res) => {
  try {
    const { studentId } = req.query;
    let filter = {};
    if (studentId) filter.studentId = studentId;

    let apps;
    try {
      apps = await Application.find(filter).sort({ createdAt: -1 });
    } catch (e) {
      apps = readLocalApps();
      if (studentId) apps = apps.filter(a => a.studentId === studentId);
    }
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/applications', async (req, res) => {
  try {
    const { 
      studentId, studentName, studentEmail, 
      programId, programTitle, domain, 
      programTrack, selectedDuration, feeAmount, 
      statementOfPurpose, portfolioUrl, resumeUrl 
    } = req.body;

    if (!studentId || !programId) {
      return res.status(400).json({ error: 'studentId and programId are required' });
    }

    const newApp = {
      id: `app-${Date.now()}`,
      studentId,
      studentName: studentName || 'Student Candidate',
      studentEmail: studentEmail || '',
      programId,
      programTitle: programTitle || 'Software Engineering Track',
      domain: domain || 'Software Development',
      programTrack: programTrack || 'Practical Internship',
      selectedDuration: selectedDuration || '1 Month',
      feeAmount: feeAmount || 299,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0],
      statementOfPurpose: statementOfPurpose || '',
      portfolioUrl: portfolioUrl || '',
      resumeUrl: resumeUrl || ''
    };

    try {
      await Application.create(newApp);
    } catch (e) {
      const apps = readLocalApps();
      apps.push(newApp);
      writeLocalApps(apps);
    }

    res.status(201).json({ message: 'Application submitted successfully', application: newApp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/applications/:id/status', async (req, res) => {
  try {
    const { status, approvedBy } = req.body;
    const appId = req.params.id;

    let appItem;
    try {
      appItem = await Application.findOne({ id: appId });
    } catch (e) {
      appItem = readLocalApps().find(a => a.id === appId);
    }

    if (!appItem) return res.status(404).json({ error: 'Application record not found' });

    let updateFields = { status, approvedBy: approvedBy || 'Super Admin' };
    if (status === 'Approved') {
      const startDate = new Date();
      const days = calculateDurationDays(appItem.selectedDuration);
      const endDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);

      updateFields.accessStartDate = startDate.toISOString();
      updateFields.accessEndDate = endDate.toISOString();
    }

    try {
      appItem = await Application.findOneAndUpdate({ id: appId }, updateFields, { new: true });
    } catch (e) {
      const apps = readLocalApps();
      const item = apps.find(a => a.id === appId);
      if (item) {
        Object.assign(item, updateFields);
        writeLocalApps(apps);
        appItem = item;
      }
    }

    res.json({ message: `Application status updated to ${status}`, application: appItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Application & Access Microservice running on port ${PORT}`);
});
