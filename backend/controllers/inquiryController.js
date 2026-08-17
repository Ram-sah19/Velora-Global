const Inquiry = require('../models/Inquiry');
const { readLocalDb, writeLocalDb } = require('../db');
const { sendInquiryEmail } = require('../services/emailService');

// ─── Email & field sanitization helpers ──────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LEN = 100;
const MAX_DESC_LEN = 2000;
const MAX_COMPANY_LEN = 150;

const ALLOWED_PROJECT_TYPES = [
  'general', 'web-development', 'mobile-app', 'ai-automation',
  'enterprise-solutions', 'internship', 'training', 'other'
];

function stripHtml(str) {
  return (str || '').replace(/<[^>]*>/g, '').trim();
}

exports.submitInquiry = async (req, res) => {
  try {
    const { clientName, email, phone, companyName, projectType, budget, description } = req.body;

    // ── Required field validation ──
    if (!clientName || !email || !description) {
      return res.status(400).json({ error: 'Name, email, and message description are required.' });
    }

    // ── Email format validation ──
    const cleanEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(cleanEmail)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    // ── Length limits to prevent abuse ──
    const cleanName = stripHtml(clientName).slice(0, MAX_NAME_LEN);
    const cleanDesc = stripHtml(description).slice(0, MAX_DESC_LEN);
    const cleanCompany = stripHtml(companyName || '').slice(0, MAX_COMPANY_LEN);
    const cleanPhone = (phone || '').replace(/[^0-9+\-\s()]/g, '').slice(0, 20);

    if (cleanName.length < 2) {
      return res.status(400).json({ error: 'Please enter your full name (at least 2 characters).' });
    }
    if (cleanDesc.length < 10) {
      return res.status(400).json({ error: 'Please describe your inquiry in at least 10 characters.' });
    }

    // ── Whitelist project type ──
    const cleanType = ALLOWED_PROJECT_TYPES.includes(projectType) ? projectType : 'general';

    const inquiryData = {
      id: `INQ-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      companyName: cleanCompany,
      projectType: cleanType,
      budget: stripHtml(budget || '').slice(0, 50),
      description: cleanDesc,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    // ── Save to MongoDB or Local JSON DB fallback ──
    try {
      const doc = new Inquiry(inquiryData);
      await doc.save();
    } catch (e) {
      const db = readLocalDb();
      if (!db.inquiries) db.inquiries = [];
      db.inquiries.push(inquiryData);
      writeLocalDb(db);
    }

    // ── Dispatch notification emails (non-blocking) ──
    sendInquiryEmail(inquiryData).catch(() => {});

    res.status(201).json({
      success: true,
      message: 'Inquiry received successfully. Our team will get in touch shortly.',
      inquiryId: inquiryData.id
    });
  } catch (err) {
    console.error('Inquiry submission error:', err.message);
    res.status(500).json({ error: 'Failed to process inquiry. Please try again.' });
  }
};

exports.getInquiries = async (req, res) => {
  try {
    let inquiries = [];
    try {
      inquiries = await Inquiry.find().sort({ createdAt: -1 });
    } catch (e) {
      const db = readLocalDb();
      inquiries = db.inquiries || [];
    }
    res.json({ inquiries });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inquiries.' });
  }
};
