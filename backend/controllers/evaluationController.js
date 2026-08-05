const Evaluation = require('../models/Evaluation');
const Task = require('../models/Task');
const Certificate = require('../models/Certificate');
const Application = require('../models/Application');

exports.getEvaluations = async (req, res) => {
  try {
    const evals = await Evaluation.find().sort({ createdAt: -1 });
    res.json(evals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.evaluateTask = async (req, res) => {
  try {
    const { taskId, qualityOfWork, technicalSkills, creativity, completionOfRequirements, professionalApproach, evaluatorName, feedback } = req.body;

    const task = await Task.findOne({ id: taskId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const q = parseFloat(qualityOfWork) || 8.0;
    const t = parseFloat(technicalSkills) || 8.0;
    const c = parseFloat(creativity) || 8.0;
    const reqComp = parseFloat(completionOfRequirements) || 8.0;
    const p = parseFloat(professionalApproach) || 8.0;

    const overall = Number(((q + t + c + reqComp + p) / 5).toFixed(1));

    let grade = 'A';
    if (overall >= 9.5) grade = 'A+';
    else if (overall >= 8.5) grade = 'A';
    else if (overall >= 7.5) grade = 'B+';
    else if (overall >= 6.5) grade = 'B';
    else grade = 'C';

    const newEval = await Evaluation.create({
      id: `eval-${Date.now()}`,
      taskId,
      applicationId: task.applicationId,
      studentId: task.studentId,
      studentName: task.studentName,
      programTitle: task.programTitle,
      evaluatorName: evaluatorName || 'Rambilas Sah (Founder & CEO)',
      scores: {
        qualityOfWork: q,
        technicalSkills: t,
        creativity: c,
        completionOfRequirements: reqComp,
        professionalApproach: p
      },
      overallScore: overall,
      grade,
      feedback: feedback || 'Great effort and completion of requirements.',
      evaluatedDate: new Date().toISOString().split('T')[0]
    });

    await Task.updateOne({ id: taskId }, { status: 'Evaluated' });

    // Issue Official Certificate
    const certId = `VG-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newCert = await Certificate.create({
      certificateId: certId,
      studentId: task.studentId,
      studentName: task.studentName,
      programTitle: task.programTitle,
      domain: task.programTitle.toLowerCase().includes('frontend') ? 'Frontend Development' :
              task.programTitle.toLowerCase().includes('backend') ? 'Backend Development' : 'Full Stack Development',
      issueDate: new Date().toISOString().split('T')[0],
      duration: '8 Weeks',
      grade,
      founderSignature: 'Rambilas Sah',
      founderTitle: 'Founder & CEO',
      coFounders: ['Puja Rouniyar', 'Rohit Sah'],
      verificationUrl: `https://veloraglobal.com/verify/${certId}`
    });

    await Application.updateOne({ id: task.applicationId }, { status: 'Completed' });

    res.status(201).json({
      message: 'Project evaluated and certificate generated successfully!',
      evaluation: newEval,
      certificate: newCert
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
