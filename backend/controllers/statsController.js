const Program = require('../models/Program');
const Application = require('../models/Application');
const Task = require('../models/Task');
const Certificate = require('../models/Certificate');
const Evaluation = require('../models/Evaluation');
const { readLocalDb } = require('../db');

exports.getStats = async (req, res) => {
  try {
    const [totalPrograms, totalApplicants, activeInterns, completedProjects, certificatesIssued, recentApplications, recentEvaluations] = await Promise.all([
      Program.countDocuments(),
      Application.countDocuments(),
      Application.countDocuments({ status: { $in: ['Approved', 'In-Progress'] } }),
      Task.countDocuments({ status: { $in: ['Evaluated', 'Submitted'] } }),
      Certificate.countDocuments(),
      Application.find().sort({ createdAt: -1 }).limit(5),
      Evaluation.find().sort({ createdAt: -1 }).limit(5)
    ]);

    res.json({
      totalPrograms,
      totalApplicants,
      activeInterns,
      completedProjects,
      certificatesIssued,
      recentApplications,
      recentEvaluations
    });
  } catch (err) {
    const db = readLocalDb();
    res.json({
      totalPrograms: db.programs ? db.programs.length : 10,
      totalApplicants: db.applications ? db.applications.length : 1,
      activeInterns: db.applications ? db.applications.filter(a => a.status === 'In-Progress' || a.status === 'Approved').length : 1,
      completedProjects: db.tasks ? db.tasks.filter(t => t.status === 'Submitted' || t.status === 'Evaluated').length : 1,
      certificatesIssued: db.certificates ? db.certificates.length : 1,
      recentApplications: db.applications ? db.applications.slice(0, 5) : [],
      recentEvaluations: db.evaluations ? db.evaluations.slice(0, 5) : []
    });
  }
};
