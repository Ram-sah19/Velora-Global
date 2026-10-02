const Certificate = require('../models/Certificate');

// The staff issue form types the certificate number itself so it matches the one
// already printed on the paper certificate.
const ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9-]{3,31}$/;

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
  const { certId } = req.params;
  // This endpoint is public and IDs are literal, so anything outside the printed
  // alphabet never reaches the database.
  if (!ID_PATTERN.test(certId)) {
    return res.status(400).json({ success: true, verified: false, message: 'Not a valid certificate ID' });
  }

  try {
    const cert = await Certificate.findOne({ certificateId: new RegExp(`^${certId}$`, 'i') });

    if (!cert) {
      return res.status(404).json({ success: true, verified: false, message: 'Certificate not found' });
    }

    // Only the fields the privacy policy discloses as public; internal identifiers
    // such as studentId and the performance grade stay in the database.
    res.json({
      success: true,
      verified: true,
      certificate: {
        certificateId: cert.certificateId,
        name: cert.studentName,
        program: cert.programTitle,
        duration: cert.duration,
        issuedDate: cert.issueDate,
        organization: 'Velora Global'
      }
    });
  } catch (err) {
    console.error('Certificate verification failed:', err.message);
    res.status(500).json({ success: false, verified: false, message: 'Verification is unavailable right now' });
  }
};

exports.createCertificate = async (req, res) => {
  try {
    const { certificateId, studentName, programTitle, duration, issueDate } = req.body;

    const missing = ['certificateId', 'studentName', 'programTitle', 'duration', 'issueDate']
      .filter(key => !String(req.body[key] || '').trim());
    if (missing.length) {
      return res.status(400).json({ error: `Missing required field(s): ${missing.join(', ')}` });
    }
    if (!ID_PATTERN.test(certificateId)) {
      return res.status(400).json({ error: 'Certificate number must use letters, numbers and dashes (4-32 characters).' });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(issueDate)) {
      return res.status(400).json({ error: 'Date of issue must be in YYYY-MM-DD form.' });
    }

    const existing = await Certificate.findOne({ certificateId: new RegExp(`^${certificateId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') });
    if (existing) {
      return res.status(409).json({ error: `Certificate number ${certificateId} is already in use.` });
    }

    const created = await Certificate.create({
      certificateId,
      studentName,
      programTitle,
      duration,
      issueDate,
      founderSignature: 'Rambilas Sah',
      founderTitle: 'Founder & CEO',
      verificationUrl: `https://velora-global.online/verify/${certificateId}`
    });

    res.status(201).json({ message: 'Certificate issued', certificate: created });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
