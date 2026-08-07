const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, default: 'Student Candidate' },
  userType: { type: String, enum: ['student', 'client', 'admin', 'superadmin'], default: 'student' },
  avatar: { type: String },
  companyName: { type: String },
  phone: { type: String },
  university: { type: String, default: 'Not specified' },
  fieldOfStudy: { type: String, default: 'General' },
  skills: [{ type: String }],
  bio: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
