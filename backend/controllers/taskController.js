const TaskModel = require('../models/Task');

exports.getTasks = (req, res) => {
  const { studentId, applicationId } = req.query;
  const tasks = TaskModel.getAll(studentId, applicationId);
  res.json(tasks);
};

exports.assignTask = (req, res) => {
  const { applicationId } = req.body;
  if (!applicationId) {
    return res.status(400).json({ error: 'applicationId is required' });
  }

  const newTask = TaskModel.assign(req.body);
  if (!newTask) {
    return res.status(404).json({ error: 'Application not found' });
  }

  res.status(201).json({ message: 'Task assigned successfully', task: newTask });
};

exports.submitTask = (req, res) => {
  const task = TaskModel.submit(req.params.id, req.body);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json({ message: 'Project submitted successfully for evaluation', task });
};
