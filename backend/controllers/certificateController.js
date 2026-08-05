const CertificateModel = require('../models/Certificate');

exports.getCertificates = (req, res) => {
  const { studentId } = req.query;
  const certs = CertificateModel.getAll(studentId);
  res.json(certs);
};

exports.verifyCertificate = (req, res) => {
  const result = CertificateModel.verify(req.params.certId);
  if (!result.valid) {
    return res.status(404).json(result);
  }
  res.json(result);
};
