const Application = require('../models/Application');
const Program = require('../models/Program');
const { readLocalDb, writeLocalDb } = require('../db');

function calculateDurationDays(durationStr) {
  if (!durationStr) return 30;
  const lower = durationStr.toLowerCase();
  if (lower.includes('1 week') || lower.includes('1 wk')) return 7;
  if (lower.includes('2 week') || lower.includes('2 wk')) return 14;
  if (lower.includes('3 week') || lower.includes('3 wk')) return 21;
  if (lower.includes('1 month') || lower.includes('1 mon')) return 30;
  if (lower.includes('2 month') || lower.includes('2 mon')) return 60;
  if (lower.includes('3 month') || lower.includes('3 mon')) return 90;
  if (lower.includes('6 month') || lower.includes('6 mon')) return 180;
  return 30;
}

exports.getApplications = async (req, res) => {
  try {
    const { studentId, status } = req.query;
    const filter = {};
    if (studentId) filter.studentId = studentId;
    if (status && status !== 'All') filter.status = status;

    const apps = await Application.find(filter).sort({ createdAt: -1 });

    // Filter out applications belonging to deleted users
    const User = require('../models/User');
    const db = readLocalDb();
    const existingUsers = await User.find().catch(() => db.users || []);
    const validUserEmails = new Set(existingUsers.map(u => (u.email || '').toLowerCase()));
    const validUserIds = new Set(existingUsers.map(u => u.id));

    const activeApps = apps.filter(a => 
      validUserEmails.has((a.studentEmail || '').toLowerCase()) || validUserIds.has(a.studentId)
    );

    res.json(activeApps);
  } catch (err) {
    const db = readLocalDb();
    let apps = db.applications || [];
    const { studentId, status } = req.query;
    if (studentId) apps = apps.filter(a => a.studentId === studentId);
    if (status && status !== 'All') apps = apps.filter(a => a.status === status);

    const existingUsers = db.users || [];
    const validUserEmails = new Set(existingUsers.map(u => (u.email || '').toLowerCase()));
    const validUserIds = new Set(existingUsers.map(u => u.id));

    const activeApps = apps.filter(a => 
      validUserEmails.has((a.studentEmail || '').toLowerCase()) || validUserIds.has(a.studentId)
    );

    res.json(activeApps);
  }
};

exports.submitApplication = async (req, res) => {
  try {
    const { 
      studentId, 
      studentName, 
      studentEmail, 
      programId, 
      programTrack, 
      selectedDuration, 
      feeAmount, 
      statementOfPurpose, 
      portfolioUrl, 
      resumeUrl 
    } = req.body;
    
    let programTitle = 'Software Engineering Program';
    let domain = 'Software Engineering';

    try {
      const prog = await Program.findOne({ id: programId });
      if (prog) {
        programTitle = prog.title;
        domain = prog.domain;
      }
    } catch (e) {
      const db = readLocalDb();
      const prog = (db.programs || []).find(p => p.id === programId);
      if (prog) {
        programTitle = prog.title;
        domain = prog.domain;
      }
    }

    const newApp = {
      id: `app-${Date.now()}`,
      studentId: studentId || `user-temp-${Date.now()}`,
      studentName: studentName || 'Student Candidate',
      studentEmail: studentEmail || '',
      programId: programId || 'prog-fe-1',
      programTitle,
      domain,
      programTrack: programTrack || 'Internship',
      selectedDuration: selectedDuration || '1 Month',
      feeAmount: feeAmount || 299,
      status: 'Pending', // Applications start as Pending until Super Admin Approves
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
      if (!db.applications) db.applications = [];
      db.applications.unshift(newApp);
      writeLocalDb(db);
    }

    res.status(201).json({ message: 'Application submitted to Super Admin for approval', application: newApp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status, approvedBy } = req.body;
    const appId = req.params.id;

    let appItem;
    try {
      appItem = await Application.findOne({ id: appId });
    } catch (e) {
      const db = readLocalDb();
      appItem = (db.applications || []).find(a => a.id === appId);
    }

    if (!appItem) {
      return res.status(404).json({ error: 'Application record not found' });
    }

    // Calculate duration access windows if status is Approved
    let updateFields = { status, approvedBy: approvedBy || 'Super Admin' };
    if (status === 'Approved') {
      const startDate = new Date();
      const days = calculateDurationDays(appItem.selectedDuration);
      const endDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);

      updateFields.accessStartDate = startDate.toISOString();
      updateFields.accessEndDate = endDate.toISOString();

      // Mark student as permanently Verified upon first approval
      try {
        const User = require('../models/User');
        await User.findOneAndUpdate(
          { $or: [{ id: appItem.studentId }, { email: appItem.studentEmail }] },
          { isVerified: true }
        );
      } catch (e) {
        const db = readLocalDb();
        const usr = (db.users || []).find(u => u.id === appItem.studentId || u.email === appItem.studentEmail);
        if (usr) {
          usr.isVerified = true;
          writeLocalDb(db);
        }
      }
    }

    try {
      appItem = await Application.findOneAndUpdate({ id: appId }, updateFields, { new: true });
    } catch (e) {
      const db = readLocalDb();
      const item = (db.applications || []).find(a => a.id === appId);
      if (item) {
        Object.assign(item, updateFields);
        writeLocalDb(db);
        appItem = item;
      }
    }

    res.json({ message: `Application status updated to ${status}`, application: appItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
