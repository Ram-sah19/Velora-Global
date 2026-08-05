const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

router.get('/', certificateController.getCertificates);
router.get('/verify/:certId', certificateController.verifyCertificate);

module.exports = router;
