const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  studentId: { type: String, required: true },
  studentName: { type: String },
  studentEmail: { type: String },
  programId: { type: String, required: true },
  programTitle: { type: String },
  domain: { type: String },
  status: { type: String, enum: ['Pending', 'Under Review', 'Approved', 'In-Progress', 'Rejected', 'Completed'], default: 'Pending' },
  appliedDate: { type: String },
  statementOfPurpose: { type: String },
  portfolioUrl: { type: String },
  resumeUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
