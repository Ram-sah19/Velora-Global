require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');
const fs = require('fs');
const path = require('path');

const Program = require('./Program');

// Force IPv4 and set Public DNS for MongoDB Atlas SRV resolution
try {
  if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
  }
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

const app = express();
const PORT = process.env.PROGRAM_SERVICE_PORT || 5002;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://ram6070246:4wA2e9P!5iM@velora.mongodb.net/velora?retryWrites=true&w=majority";

const DB_FILE = path.join(__dirname, 'programs.json');

const readLocalPrograms = () => {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
  } catch (e) {}
  return [
    {
      id: "prog-web-dev",
      title: "Web App Development Internship",
      domain: "Web App Development",
      duration: "2 Months",
      stipend: "NPR 15,000 / month",
      locationType: "Remote / Hybrid",
      level: "Intermediate",
      description: "Build production-grade full-stack web applications using React, Node.js, Express, and MongoDB Atlas.",
      skillsRequired: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
      perks: ["1-on-1 Mentorship", "Verified Experience Certificate", "Letter of Recommendation"],
      deliverables: ["Full Stack MVC Application", "REST API Backend Service", "Vercel / Render Deployment"],
      openPositions: 8,
      appliedCount: 24,
      status: "Active"
    },
    {
      id: "prog-ai-ml",
      title: "Artificial Intelligence & Machine Learning Internship",
      domain: "Artificial Intelligence & Machine Learning",
      duration: "3 Months",
      stipend: "NPR 18,000 / month",
      locationType: "Remote",
      level: "Advanced",
      description: "Design and fine-tune Large Language Models, PyTorch neural networks, and automated NLP pipelines.",
      skillsRequired: ["Python 3", "PyTorch", "Scikit-Learn", "FastAPI", "Transformers"],
      perks: ["GPU Cloud Credits", "Research Paper Co-Authorship", "Verified Experience Certificate"],
      deliverables: ["Trained Model Checkpoints", "API Inference Endpoint", "Technical Documentation"],
      openPositions: 5,
      appliedCount: 19,
      status: "Active"
    }
  ];
};

const writeLocalPrograms = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (e) {}
};

app.use(cors());
app.use(express.json());

// Connect MongoDB Atlas
mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log('✅ Program Catalog Service connected to MongoDB Atlas'))
  .catch(() => console.warn('⚠️ Program Catalog Service running in JSON database fallback mode'));

// Health Check
app.get('/health', (req, res) => {
  res.json({ service: 'program-service', status: 'healthy', port: PORT, timestamp: new Date() });
});

// Domain Routes
app.get('/api/programs', async (req, res) => {
  try {
    const { domain, search } = req.query;
    let filter = {};
    if (domain) filter.domain = new RegExp(domain, 'i');

    let programs;
    try {
      programs = await Program.find(filter);
    } catch (e) {
      programs = readLocalPrograms();
      if (domain) programs = programs.filter(p => (p.domain || '').toLowerCase().includes(domain.toLowerCase()));
    }

    if (search) {
      const q = search.toLowerCase();
      programs = programs.filter(p => 
        (p.title || '').toLowerCase().includes(q) || 
        (p.domain || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
      );
    }

    res.json(programs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/programs/:id', async (req, res) => {
  try {
    let prog;
    try {
      prog = await Program.findOne({ id: req.params.id });
    } catch (e) {
      prog = readLocalPrograms().find(p => p.id === req.params.id);
    }
    if (!prog) return res.status(404).json({ error: 'Program not found' });
    res.json(prog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/programs', async (req, res) => {
  try {
    const { title, domain, duration, stipend, locationType, level, description, skillsRequired, deliverables, openPositions } = req.body;
    if (!title || !domain) {
      return res.status(400).json({ error: 'Title and domain are required' });
    }

    const newProgram = {
      id: `prog-${Date.now()}`,
      title,
      domain,
      duration: duration || '2 Months',
      stipend: stipend || 'Unpaid / Certificate Track',
      locationType: locationType || 'Remote',
      level: level || 'All Levels',
      description: description || `Practical experience in ${domain}.`,
      skillsRequired: skillsRequired || [domain],
      deliverables: deliverables || ['Live Project Repository', 'Mentorship Sessions'],
      openPositions: openPositions || 10,
      appliedCount: 0,
      status: 'Active'
    };

    try {
      await Program.create(newProgram);
    } catch (e) {
      const progs = readLocalPrograms();
      progs.push(newProgram);
      writeLocalPrograms(progs);
    }

    res.status(201).json({ message: 'Program created successfully', program: newProgram });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Program Catalog Microservice running on port ${PORT}`);
});
