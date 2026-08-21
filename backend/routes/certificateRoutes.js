const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const { cacheMiddleware } = require('../services/redisCache');

router.get('/', certificateController.getCertificates);
// Cache verified certificate records for 10 minutes (sub-2ms QR load)
router.get('/verify/:certId', cacheMiddleware(600), certificateController.verifyCertificate);

module.exports = router;
