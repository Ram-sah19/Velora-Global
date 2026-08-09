const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  qualityOfWork: { type: Number, default: 8.0 },
  technicalSkills: { type: Number, default: 8.0 },
  creativity: { type: Number, default: 8.0 },
  completionOfRequirements: { type: Number, default: 8.0 },
  professionalApproach: { type: Number, default: 8.0 }
}, { _id: false });

const evaluationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  taskId: { type: String, required: true },
  applicationId: { type: String },
  studentId: { type: String },
  studentName: { type: String },
  programTitle: { type: String },
  evaluatorName: { type: String, default: 'Rambilas Sah (Founder & CEO)' },
  scores: scoreSchema,
  overallScore: { type: Number },
  grade: { type: String },
  feedback: { type: String },
  evaluatedDate: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Evaluation', evaluationSchema);
