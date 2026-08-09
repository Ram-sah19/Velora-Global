require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');
const fs = require('fs');
const path = require('path');

const Task = require('./Task');
const Evaluation = require('./Evaluation');

// Force IPv4 and set Public DNS for MongoDB Atlas SRV resolution
try {
  if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
  }
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

const app = express();
const PORT = process.env.TASK_SERVICE_PORT || 5004;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://ram6070246:4wA2e9P!5iM@velora.mongodb.net/velora?retryWrites=true&w=majority";

const TASKS_FILE = path.join(__dirname, 'tasks.json');
const EVALS_FILE = path.join(__dirname, 'evaluations.json');

const readLocalTasks = () => {
  try {
    if (fs.existsSync(TASKS_FILE)) return JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
  } catch (e) {}
  return [];
};

const writeLocalTasks = (data) => {
  try { fs.writeFileSync(TASKS_FILE, JSON.stringify(data, null, 2)); } catch (e) {}
};

const readLocalEvals = () => {
  try {
    if (fs.existsSync(EVALS_FILE)) return JSON.parse(fs.readFileSync(EVALS_FILE, 'utf8'));
  } catch (e) {}
  return [];
};

const writeLocalEvals = (data) => {
  try { fs.writeFileSync(EVALS_FILE, JSON.stringify(data, null, 2)); } catch (e) {}
};

app.use(cors());
app.use(express.json());

// Connect MongoDB Atlas
mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log('✅ Task & Evaluation Service connected to MongoDB Atlas'))
  .catch(() => console.warn('⚠️ Task & Evaluation Service running in JSON database fallback mode'));

// Health Check
app.get('/health', (req, res) => {
  res.json({ service: 'task-service', status: 'healthy', port: PORT, timestamp: new Date() });
});

// Domain Routes — Tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const { studentId } = req.query;
    let filter = {};
    if (studentId) filter.studentId = studentId;

    let tasks;
    try {
      tasks = await Task.find(filter).sort({ createdAt: -1 });
    } catch (e) {
      tasks = readLocalTasks();
      if (studentId) tasks = tasks.filter(t => t.studentId === studentId);
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { applicationId, studentId, studentName, programId, programTitle, title, description, dueDate } = req.body;
    if (!applicationId || !studentId || !title) {
      return res.status(400).json({ error: 'applicationId, studentId, and title are required' });
    }

    const newTask = {
      id: `task-${Date.now()}`,
      applicationId,
      studentId,
      studentName: studentName || 'Student Candidate',
      programId: programId || 'prog-general',
      programTitle: programTitle || 'Software Engineering Track',
      title,
      description: description || 'Complete module deliverables and submit code repository link.',
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Assigned'
    };

    try {
      await Task.create(newTask);
    } catch (e) {
      const tasks = readLocalTasks();
      tasks.push(newTask);
      writeLocalTasks(tasks);
    }

    res.status(201).json({ message: 'Task assigned successfully', task: newTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tasks/:id/submit', async (req, res) => {
  try {
    const taskId = req.params.id;
    const { githubUrl, liveUrl, notes } = req.body;

    const submissionData = {
      submittedDate: new Date().toISOString().split('T')[0],
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      notes: notes || ''
    };

    let updatedTask;
    try {
      updatedTask = await Task.findOneAndUpdate(
        { id: taskId },
        { status: 'Submitted', submission: submissionData },
        { new: true }
      );
    } catch (e) {
      const tasks = readLocalTasks();
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        task.status = 'Submitted';
        task.submission = submissionData;
        writeLocalTasks(tasks);
        updatedTask = task;
      }
    }

    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Project task submitted successfully for evaluation', task: updatedTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Domain Routes — Evaluations
app.get('/api/evaluations', async (req, res) => {
  try {
    const { studentId } = req.query;
    let filter = {};
    if (studentId) filter.studentId = studentId;

    let evals;
    try {
      evals = await Evaluation.find(filter).sort({ createdAt: -1 });
    } catch (e) {
      evals = readLocalEvals();
      if (studentId) evals = evals.filter(ev => ev.studentId === studentId);
    }
    res.json(evals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/evaluations', async (req, res) => {
  try {
    const { taskId, applicationId, studentId, studentName, programTitle, scores, feedback, evaluatorName } = req.body;
    if (!taskId) return res.status(400).json({ error: 'taskId is required' });

    const q = (scores && scores.qualityOfWork) || 8.0;
    const t = (scores && scores.technicalSkills) || 8.0;
    const c = (scores && scores.creativity) || 8.0;
    const reqs = (scores && scores.completionOfRequirements) || 8.0;
    const p = (scores && scores.professionalApproach) || 8.0;

    const overallScore = parseFloat(((q + t + c + reqs + p) / 5).toFixed(1));
    let grade = 'A+';
    if (overallScore < 7.0) grade = 'B';
    else if (overallScore < 8.5) grade = 'A';

    const newEval = {
      id: `eval-${Date.now()}`,
      taskId,
      applicationId: applicationId || '',
      studentId: studentId || '',
      studentName: studentName || 'Student Candidate',
      programTitle: programTitle || 'Software Engineering Track',
      evaluatorName: evaluatorName || 'Rambilas Sah (Founder & CEO)',
      scores: { qualityOfWork: q, technicalSkills: t, creativity: c, completionOfRequirements: reqs, professionalApproach: p },
      overallScore,
      grade,
      feedback: feedback || 'Great effort and execution.',
      evaluatedDate: new Date().toISOString().split('T')[0]
    };

    try {
      await Evaluation.create(newEval);
      await Task.findOneAndUpdate({ id: taskId }, { status: 'Evaluated' });
    } catch (e) {
      const evals = readLocalEvals();
      evals.push(newEval);
      writeLocalEvals(evals);

      const tasks = readLocalTasks();
      const task = tasks.find(tk => tk.id === taskId);
      if (task) {
        task.status = 'Evaluated';
        writeLocalTasks(tasks);
      }
    }

    res.status(201).json({ message: 'Task evaluated successfully', evaluation: newEval });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Task & Evaluation Microservice running on port ${PORT}`);
});
