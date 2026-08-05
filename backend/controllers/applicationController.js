const Application = require('../models/Application');
const Program = require('../models/Program');
const { readLocalDb, writeLocalDb } = require('../db');

exports.getApplications = async (req, res) => {
  try {
    const { studentId, status } = req.query;
    const filter = {};
    if (studentId) filter.studentId = studentId;
    if (status && status !== 'All') filter.status = status;

    const apps = await Application.find(filter).sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    const db = readLocalDb();
    let apps = db.applications;
    const { studentId, status } = req.query;
    if (studentId) apps = apps.filter(a => a.studentId === studentId);
    if (status && status !== 'All') apps = apps.filter(a => a.status === status);
    res.json(apps);
  }
};

exports.submitApplication = async (req, res) => {
  try {
    const { studentId, studentName, studentEmail, programId, statementOfPurpose, portfolioUrl, resumeUrl } = req.body;
    
    let programTitle = 'Internship Program';
    let domain = 'Technology';

    try {
      const prog = await Program.findOne({ id: programId });
      if (prog) {
        programTitle = prog.title;
        domain = prog.domain;
      }
    } catch (e) {
      const db = readLocalDb();
      const prog = db.programs.find(p => p.id === programId);
      if (prog) {
        programTitle = prog.title;
        domain = prog.domain;
      }
    }

    const newApp = {
      id: `app-${Date.now()}`,
      studentId,
      studentName: studentName || 'Student Candidate',
      studentEmail: studentEmail || '',
      programId,
      programTitle,
      domain,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0],
      statementOfPurpose: statementOfPurpose || '',
      portfolioUrl: portfolioUrl || '',
      resumeUrl: resumeUrl || ''
    };

    try {
      await Application.create(newApp);
      await Program.updateOne({ id: programId }, { $inc: { appliedCount: 1 } });
    } catch (e) {
      const db = readLocalDb();
      db.applications.unshift(newApp);
      writeLocalDb(db);
    }

    res.status(201).json({ message: 'Application submitted successfully', application: newApp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    let appItem;
    try {
      appItem = await Application.findOneAndUpdate({ id: req.params.id }, { status }, { new: true });
    } catch (e) {
      const db = readLocalDb();
      appItem = db.applications.find(a => a.id === req.params.id);
      if (appItem) {
        appItem.status = status;
        writeLocalDb(db);
      }
    }

    if (!appItem) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ message: `Application status updated to ${status}`, application: appItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
