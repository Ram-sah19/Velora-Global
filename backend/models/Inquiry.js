const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  companyName: {
    type: String,
    trim: true,
    default: ''
  },
  projectType: {
    type: String,
    default: 'general'
  },
  budget: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'in_review', 'contacted', 'closed'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

inquirySchema.pre('save', function (next) {
  if (!this.id) {
    this.id = `INQ-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  next();
});

module.exports = mongoose.model('Inquiry', inquirySchema);
