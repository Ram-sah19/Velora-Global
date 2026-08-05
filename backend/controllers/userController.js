const UserModel = require('../models/User');

exports.getUsers = (req, res) => {
  const users = UserModel.getAll();
  res.json(users);
};

exports.getFounders = (req, res) => {
  const founders = UserModel.getFounders();
  res.json(founders);
};

exports.registerStudent = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const existing = UserModel.findByEmail(email);
  if (existing) {
    return res.json({ message: 'User already exists', user: existing });
  }

  const newUser = UserModel.create(req.body);
  res.status(201).json({ message: 'Registration successful', user: newUser });
};
