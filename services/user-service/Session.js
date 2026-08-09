const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  userType: { type: String, default: 'student' },
  expiresAt: { type: Date, required: true },
  isRevoked: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
