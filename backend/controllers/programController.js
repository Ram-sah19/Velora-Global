const Program = require('../models/Program');
const { readLocalDb, writeLocalDb } = require('../db');
const { clearCache } = require('../services/redisCache');

exports.getPrograms = async (req, res) => {
  try {
    const { domain, search } = req.query;
    const filter = {};

    if (domain && domain !== 'All') {
      filter.domain = new RegExp(`^${domain}$`, 'i');
    }

    if (search) {
      // Escape special regex characters to prevent ReDoS attacks
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [
        { title: new RegExp(escapedSearch, 'i') },
        { description: new RegExp(escapedSearch, 'i') },
        { skillsRequired: new RegExp(escapedSearch, 'i') }
      ];
    }

    const programs = await Program.find(filter).sort({ createdAt: -1 });
    res.json(programs);
  } catch (err) {
    // Fallback to local DB if Atlas connection is warming up or DNS blocked
    const db = readLocalDb();
    let filtered = db.programs;
    const { domain, search } = req.query;
    if (domain && domain !== 'All') {
      filtered = filtered.filter(p => p.domain.toLowerCase() === domain.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    res.json(filtered);
  }
};

exports.getProgramById = async (req, res) => {
  try {
    const program = await Program.findOne({ id: req.params.id });
    if (program) return res.json(program);
    const db = readLocalDb();
    const local = db.programs.find(p => p.id === req.params.id);
    if (!local) return res.status(404).json({ error: 'Program not found' });
    res.json(local);
  } catch (err) {
    const db = readLocalDb();
    const local = db.programs.find(p => p.id === req.params.id);
    if (!local) return res.status(404).json({ error: 'Program not found' });
    res.json(local);
  }
};

exports.createProgram = async (req, res) => {
  try {
    const { title, domain, duration, stipend, locationType, level, description, skillsRequired, perks, deliverables, openPositions } = req.body;
    if (!title || !domain) {
      return res.status(400).json({ error: 'Title and domain are required' });
    }

    const newProg = {
      id: `prog-${Date.now()}`,
      title,
      domain,
      duration: duration || '6 Weeks',
      stipend: stipend || 'Unpaid / Stipend on Completion',
      locationType: locationType || 'Remote',
      level: level || 'All Levels',
      description: description || '',
      skillsRequired: Array.isArray(skillsRequired) ? skillsRequired : (skillsRequired ? skillsRequired.split(',') : []),
      perks: Array.isArray(perks) ? perks : ['Official Certificate', 'Mentorship'],
      deliverables: Array.isArray(deliverables) ? deliverables : ['Complete assigned domain project'],
      openPositions: parseInt(openPositions) || 10,
      appliedCount: 0,
      status: 'Active'
    };

    try {
      await Program.create(newProg);
    } catch (e) {
      // Local fallback write
      const db = readLocalDb();
      db.programs.unshift(newProg);
      writeLocalDb(db);
    }

    // Auto-invalidate programs and stats caches
    clearCache('/api/programs*');
    clearCache('/api/stats*');

    res.status(201).json({ message: 'Program created successfully', program: newProg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
