const ProgramModel = require('../models/Program');
const ApplicationModel = require('../models/Application');
const TaskModel = require('../models/Task');
const CertificateModel = require('../models/Certificate');
const EvaluationModel = require('../models/Evaluation');

exports.getStats = (req, res) => {
  const programs = ProgramModel.getAll();
  const applications = ApplicationModel.getAll();
  const tasks = TaskModel.getAll();
  const certificates = CertificateModel.getAll();
  const evaluations = EvaluationModel.getAll();

  const totalPrograms = programs.length;
  const totalApplicants = applications.length;
  const activeInterns = applications.filter(a => a.status === 'Approved' || a.status === 'In-Progress').length;
  const completedProjects = tasks.filter(t => t.status === 'Evaluated' || t.status === 'Submitted').length;
  const certificatesIssued = certificates.length;

  res.json({
    totalPrograms,
    totalApplicants,
    activeInterns,
    completedProjects,
    certificatesIssued,
    recentApplications: applications.slice(0, 5),
    recentEvaluations: evaluations.slice(0, 5)
  });
};
