const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateId: { type: String, required: true, unique: true },
  // Hand-issued certificates have no student account behind them.
  studentId: { type: String, default: '' },
  studentName: { type: String, required: true },
  programTitle: { type: String },
  domain: { type: String },
  issueDate: { type: String },
  duration: { type: String },
  grade: { type: String },
  founderSignature: { type: String, default: 'Rambilas Sah' },
  founderTitle: { type: String, default: 'Founder & CEO' },
  coFounders: [{ type: String }],
  verificationUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
