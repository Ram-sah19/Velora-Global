const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  domain: { type: String, required: true },
  duration: { type: String, default: '6 Weeks' },
  stipend: { type: String, default: 'Unpaid / Stipend on Completion' },
  locationType: { type: String, default: 'Remote' },
  level: { type: String, default: 'All Levels' },
  description: { type: String },
  skillsRequired: [{ type: String }],
  perks: [{ type: String }],
  deliverables: [{ type: String }],
  openPositions: { type: Number, default: 10 },
  appliedCount: { type: Number, default: 0 },
  status: { type: String, default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Program', programSchema);
