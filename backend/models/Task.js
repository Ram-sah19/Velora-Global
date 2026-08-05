const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  submittedDate: { type: String },
  githubUrl: { type: String },
  liveUrl: { type: String },
  notes: { type: String }
}, { _id: false });

const taskSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  applicationId: { type: String, required: true },
  studentId: { type: String, required: true },
  studentName: { type: String },
  programId: { type: String },
  programTitle: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  assignedDate: { type: String },
  dueDate: { type: String },
  status: { type: String, enum: ['Assigned', 'In Progress', 'Submitted', 'Evaluated'], default: 'Assigned' },
  submission: submissionSchema
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
