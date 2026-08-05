const EvaluationModel = require('../models/Evaluation');

exports.getEvaluations = (req, res) => {
  const evaluations = EvaluationModel.getAll();
  res.json(evaluations);
};

exports.evaluateTask = (req, res) => {
  const { taskId } = req.body;
  if (!taskId) {
    return res.status(400).json({ error: 'taskId is required' });
  }

  const result = EvaluationModel.evaluate(req.body);
  if (!result) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(201).json({
    message: 'Project evaluated and certificate generated successfully!',
    evaluation: result.evaluation,
    certificate: result.certificate
  });
};
