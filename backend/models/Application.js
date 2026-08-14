const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  studentId: { type: String, required: true },
  studentName: { type: String },
  studentEmail: { type: String },
  programId: { type: String, required: true },
  programTitle: { type: String },
  domain: { type: String },
  programTrack: { type: String, default: 'Internship' }, // 'Internship' or 'Training'
  selectedDuration: { type: String, default: '1 Month' }, // '1 Week', '2 Weeks', '3 Weeks', '1 Month', '2 Months', '3 Months', '6 Months'
  feeAmount: { type: Number, default: 499 },
  status: { type: String, enum: ['Pending', 'Under Review', 'Approved', 'In-Progress', 'Rejected', 'Completed'], default: 'Pending' },
  accessStartDate: { type: String },
  accessEndDate: { type: String },
  approvedBy: { type: String },
  appliedDate: { type: String },
  statementOfPurpose: { type: String },
  portfolioUrl: { type: String },
  resumeUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
