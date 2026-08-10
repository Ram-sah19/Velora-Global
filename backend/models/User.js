const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false },
  role: { type: String, default: 'Student Candidate' },
  userType: { type: String, enum: ['student', 'client', 'admin', 'superadmin'], default: 'student' },
  avatar: { type: String },
  companyName: { type: String },
  phone: { type: String },
  university: { type: String, default: 'Not specified' },
  fieldOfStudy: { type: String, default: 'General' },
  skills: [{ type: String }],
  bio: { type: String },
  isVerified: { type: Boolean, default: false },
  resetToken: { type: String, select: false },
  resetTokenExpiry: { type: Date, select: false },
  verificationToken: { type: String, select: false },
  verificationTokenExpiry: { type: Date, select: false },
  verificationOtp: { type: String, select: false },
  verificationOtpExpiry: { type: Date, select: false },
  countryCode: { type: String, default: '+977' },
  isPhoneVerified: { type: Boolean, default: false },
  phoneOtp: { type: String, select: false },
  phoneOtpExpiry: { type: Date, select: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
