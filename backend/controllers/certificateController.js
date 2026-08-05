const Certificate = require('../models/Certificate');

exports.getCertificates = async (req, res) => {
  try {
    const { studentId } = req.query;
    const filter = studentId ? { studentId } : {};
    const certs = await Certificate.find(filter).sort({ createdAt: -1 });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findOne({ certificateId: new RegExp(`^${req.params.certId}$`, 'i') });

    if (!cert) {
      return res.status(404).json({ valid: false, message: 'Certificate ID not found in Velora Global records' });
    }

    res.json({
      valid: true,
      certificate: cert,
      issuer: 'Velora Global',
      verifiedAt: new Date()
    });
  } catch (err) {
    res.status(500).json({ valid: false, error: err.message });
  }
};
