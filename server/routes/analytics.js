const express = require('express');
const { authenticateToken, requireRole } = require('../middleware/auth');
const analyticsController = require('../controllers/analyticsController');

const router = express.Router();

router.get('/stats', authenticateToken, requireRole('ADMIN'), analyticsController.getStats);

module.exports = router;
