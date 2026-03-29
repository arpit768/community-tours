const express = require('express');
const { body, param } = require('express-validator');
const validate = require('../middleware/validate');
const { authenticateToken, requireRole } = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', authenticateToken, requireRole('ADMIN'), userController.getAllUsers);

router.get(
  '/:id',
  authenticateToken,
  validate([param('id').isMongoId().withMessage('Invalid user ID')]),
  userController.getUserById
);

router.patch(
  '/:id/role',
  authenticateToken,
  requireRole('ADMIN'),
  validate([
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('role').isIn(['CUSTOMER', 'STAFF', 'ADMIN']).withMessage('Invalid role'),
  ]),
  userController.updateUserRole
);

router.delete(
  '/:id',
  authenticateToken,
  requireRole('ADMIN'),
  validate([param('id').isMongoId().withMessage('Invalid user ID')]),
  userController.deleteUser
);

module.exports = router;
