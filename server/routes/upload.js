const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { uploadMiddleware, uploadFile } = require('../controllers/uploadController');

const router = express.Router();

router.post('/', authenticateToken, uploadMiddleware, uploadFile);

module.exports = router;
