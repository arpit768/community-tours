const express = require('express');
const { body, param } = require('express-validator');
const validate = require('../middleware/validate');
const { authenticateToken, requireRole } = require('../middleware/auth');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/', authenticateToken, bookingController.getAllBookings);

router.get(
  '/:id',
  authenticateToken,
  validate([param('id').isMongoId().withMessage('Invalid booking ID')]),
  bookingController.getBookingById
);

router.post(
  '/',
  authenticateToken,
  validate([
    body('tourId').isMongoId().withMessage('Valid tour ID is required'),
    body('startDate').notEmpty().withMessage('Start date is required'),
    body('endDate').notEmpty().withMessage('End date is required'),
    body('numPeople').isInt({ min: 1 }).withMessage('Number of people must be at least 1'),
    body('totalPrice').isFloat({ min: 0 }).withMessage('Total price must be a positive number'),
    body('destination').trim().notEmpty().withMessage('Destination is required'),
  ]),
  bookingController.createBooking
);

router.patch(
  '/:id/status',
  authenticateToken,
  requireRole('STAFF', 'ADMIN'),
  validate([
    param('id').isMongoId().withMessage('Invalid booking ID'),
    body('status').isIn(['CONFIRMED', 'CANCELLED', 'COMPLETED']).withMessage('Invalid status'),
  ]),
  bookingController.updateBookingStatus
);

module.exports = router;
