const ApplicationModel = require('../models/Application');

exports.getApplications = (req, res) => {
  const { studentId, status } = req.query;
  const apps = ApplicationModel.getAll(studentId, status);
  res.json(apps);
};

exports.submitApplication = (req, res) => {
  const { studentId, programId } = req.body;
  if (!studentId || !programId) {
    return res.status(400).json({ error: 'studentId and programId are required' });
  }

  const existing = ApplicationModel.findExisting(studentId, programId);
  if (existing) {
    return res.status(400).json({ error: 'You have already submitted an application for this program' });
  }

  const newApp = ApplicationModel.create(req.body);
  if (!newApp) {
    return res.status(404).json({ error: 'Internship program not found' });
  }

  res.status(201).json({ message: 'Application submitted successfully', application: newApp });
};

exports.updateStatus = (req, res) => {
  const { status } = req.body;
  const appItem = ApplicationModel.updateStatus(req.params.id, status);
  if (!appItem) {
    return res.status(404).json({ error: 'Application not found' });
  }
  res.json({ message: `Application status updated to ${status}`, application: appItem });
};
