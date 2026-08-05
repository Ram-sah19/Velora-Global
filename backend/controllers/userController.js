const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFounders = async (req, res) => {
  try {
    const founders = await User.find({ userType: 'admin' });
    res.json(founders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.registerStudent = async (req, res) => {
  try {
    const { name, email, university, fieldOfStudy, skills, bio } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.json({ message: 'User already exists', user: existing });
    }

    const newUser = await User.create({
      id: `user-student-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      role: 'Student Candidate',
      userType: 'student',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      university: university || 'Not specified',
      fieldOfStudy: fieldOfStudy || 'General',
      skills: skills || [],
      bio: bio || 'Eager to gain real-world project experience with Velora Global.'
    });

    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
