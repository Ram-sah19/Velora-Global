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
    const { studentId, studentEmail, status } = req.query;
    const filter = {};

    if (studentId || studentEmail) {
      const orClauses = [];
      if (studentId) orClauses.push({ studentId });
      if (studentEmail) orClauses.push({ studentEmail: new RegExp(`^${studentEmail.trim()}$`, 'i') });
      if (orClauses.length > 0) filter.$or = orClauses;
    }
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
    const { studentId, studentEmail, status } = req.query;

    if (studentId || studentEmail) {
      apps = apps.filter(a => 
        (studentId && a.studentId === studentId) ||
        (studentEmail && a.studentEmail && a.studentEmail.toLowerCase() === studentEmail.toLowerCase())
      );
    }
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

    const initialStatus = req.body.status || 'Approved';
    const startDate = new Date();
    const days = calculateDurationDays(selectedDuration || '1 Month');
    const endDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);

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
      feeAmount: feeAmount || 499,
      status: initialStatus,
      enrolledBy: req.body.enrolledBy || 'Administrator',
      accessStartDate: startDate.toISOString(),
      accessEndDate: endDate.toISOString(),
      appliedDate: new Date().toISOString().split('T')[0],
      statementOfPurpose: statementOfPurpose || '',
      portfolioUrl: portfolioUrl || '',
      resumeUrl: resumeUrl || ''
    };

    try {
      await Application.create(newApp);
      await Program.updateOne({ id: programId }, { $inc: { appliedCount: 1 } });
      
      const User = require('../models/User');
      await User.findOneAndUpdate(
        { $or: [{ id: newApp.studentId }, { email: newApp.studentEmail }] },
        { isVerified: true }
      ).catch(() => {});
    } catch (e) {
      const db = readLocalDb();
      if (!db.applications) db.applications = [];
      db.applications.unshift(newApp);
      
      const usr = (db.users || []).find(u => u.id === newApp.studentId || u.email === newApp.studentEmail);
      if (usr) usr.isVerified = true;
      
      writeLocalDb(db);
    }

    res.status(201).json({ message: 'Program enrollment processed successfully', application: newApp });
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

exports.updateApplication = async (req, res) => {
  try {
    const appId = req.params.id;
    const { programTitle, domain, programTrack, selectedDuration, status } = req.body;

    let updateFields = {};
    if (programTitle) updateFields.programTitle = programTitle;
    if (domain) updateFields.domain = domain;
    if (programTrack) updateFields.programTrack = programTrack;
    if (selectedDuration) {
      updateFields.selectedDuration = selectedDuration;
      const startDate = new Date();
      const days = calculateDurationDays(selectedDuration);
      const endDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);
      updateFields.accessStartDate = startDate.toISOString();
      updateFields.accessEndDate = endDate.toISOString();
    }
    if (status) {
      updateFields.status = status;
      if (status === 'Approved') {
        const startDate = new Date();
        const days = calculateDurationDays(selectedDuration || '1 Month');
        const endDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);
        updateFields.accessStartDate = startDate.toISOString();
        updateFields.accessEndDate = endDate.toISOString();
      }
    }

    let appItem;
    const mongoose = require('mongoose');
    const orConditions = [{ id: appId }];
    if (mongoose.Types.ObjectId.isValid(appId)) {
      orConditions.push({ _id: appId });
    }

    try {
      appItem = await Application.findOneAndUpdate({ $or: orConditions }, updateFields, { new: true });
    } catch (e) {
      console.warn('Mongo update error:', e.message);
    }

    const db = readLocalDb();
    const item = (db.applications || []).find(a => a.id === appId || a._id === appId);
    if (item) {
      Object.assign(item, updateFields);
      writeLocalDb(db);
      if (!appItem) appItem = item;
    }

    res.json({ message: 'Enrollment updated successfully in database', application: appItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const appId = req.params.id;
    const mongoose = require('mongoose');
    const orConditions = [{ id: appId }];
    if (mongoose.Types.ObjectId.isValid(appId)) {
      orConditions.push({ _id: appId });
    }

    // 1. Purge from MongoDB
    try {
      await Application.deleteMany({ $or: orConditions });
    } catch (e) {
      console.warn('Mongo delete error:', e.message);
    }

    // 2. Purge from local db.json
    const db = readLocalDb();
    if (db.applications) {
      db.applications = db.applications.filter(a => a.id !== appId && a._id !== appId);
      writeLocalDb(db);
    }

    res.json({ message: 'Enrollment permanently removed from database', id: appId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
