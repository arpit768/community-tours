const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const notificationController = require('../controllers/notificationController');

const router = express.Router();

router.get('/', authenticateToken, notificationController.getNotifications);
router.post('/read', authenticateToken, notificationController.markAllRead);

module.exports = router;
