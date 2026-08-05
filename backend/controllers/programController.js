const ProgramModel = require('../models/Program');

exports.getPrograms = (req, res) => {
  const { domain, search } = req.query;
  const programs = ProgramModel.getAll(domain, search);
  res.json(programs);
};

exports.getProgramById = (req, res) => {
  const program = ProgramModel.findById(req.params.id);
  if (!program) {
    return res.status(404).json({ error: 'Program not found' });
  }
  res.json(program);
};

exports.createProgram = (req, res) => {
  const { title, domain } = req.body;
  if (!title || !domain) {
    return res.status(400).json({ error: 'Title and domain are required' });
  }

  const newProg = ProgramModel.create(req.body);
  res.status(201).json({ message: 'Program created successfully', program: newProg });
};
