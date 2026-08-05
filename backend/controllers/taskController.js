const Task = require('../models/Task');
const Application = require('../models/Application');

exports.getTasks = async (req, res) => {
  try {
    const { studentId, applicationId } = req.query;
    const filter = {};

    if (studentId) filter.studentId = studentId;
    if (applicationId) filter.applicationId = applicationId;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.assignTask = async (req, res) => {
  try {
    const { applicationId, title, description, dueDate } = req.body;

    const appItem = await Application.findOne({ id: applicationId });
    if (!appItem) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const newTask = await Task.create({
      id: `task-${Date.now()}`,
      applicationId,
      studentId: appItem.studentId,
      studentName: appItem.studentName,
      programId: appItem.programId,
      programTitle: appItem.programTitle,
      title: title || `Project Assignment: ${appItem.programTitle}`,
      description: description || 'Complete domain project deliverables.',
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: dueDate || '2026-08-30',
      status: 'Assigned',
      submission: null
    });

    await Application.updateOne({ id: applicationId }, { status: 'In-Progress' });

    res.status(201).json({ message: 'Task assigned successfully', task: newTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.submitTask = async (req, res) => {
  try {
    const { githubUrl, liveUrl, notes } = req.body;

    const task = await Task.findOneAndUpdate(
      { id: req.params.id },
      {
        status: 'Submitted',
        submission: {
          submittedDate: new Date().toISOString().split('T')[0],
          githubUrl: githubUrl || '',
          liveUrl: liveUrl || '',
          notes: notes || ''
        }
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Project submitted successfully for evaluation', task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
