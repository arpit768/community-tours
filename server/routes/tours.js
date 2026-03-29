const express = require('express');
const { body, param } = require('express-validator');
const validate = require('../middleware/validate');
const { authenticateToken, requireRole } = require('../middleware/auth');
const tourController = require('../controllers/tourController');

const router = express.Router();

const TOUR_TYPES = ['Adventure Trek', 'Cultural Tour', 'Wildlife Safari', 'Mountain Expedition', 'Pilgrimage', 'City Tour'];
const DIFFICULTIES = ['Easy', 'Moderate', 'Challenging', 'Extreme'];

router.get('/', tourController.getAllTours);

router.get(
  '/:id',
  validate([param('id').isMongoId().withMessage('Invalid tour ID')]),
  tourController.getTourById
);

router.post(
  '/',
  authenticateToken,
  requireRole('STAFF', 'ADMIN'),
  validate([
    body('name').trim().notEmpty().withMessage('Tour name is required'),
    body('type').isIn(TOUR_TYPES).withMessage('Invalid tour type'),
    body('pricePerPerson').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('duration').isInt({ min: 1 }).withMessage('Duration must be at least 1 day'),
    body('maxGroupSize').isInt({ min: 1 }).withMessage('Max group size must be at least 1'),
    body('difficulty').optional().isIn(DIFFICULTIES).withMessage('Invalid difficulty level'),
  ]),
  tourController.createTour
);

router.patch(
  '/:id',
  authenticateToken,
  requireRole('STAFF', 'ADMIN'),
  validate([
    param('id').isMongoId().withMessage('Invalid tour ID'),
    body('name').optional().trim().notEmpty().withMessage('Tour name cannot be empty'),
    body('type').optional().isIn(TOUR_TYPES).withMessage('Invalid tour type'),
    body('pricePerPerson').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('duration').optional().isInt({ min: 1 }).withMessage('Duration must be at least 1 day'),
    body('maxGroupSize').optional().isInt({ min: 1 }).withMessage('Max group size must be at least 1'),
    body('difficulty').optional().isIn(DIFFICULTIES).withMessage('Invalid difficulty level'),
  ]),
  tourController.updateTour
);

router.delete(
  '/:id',
  authenticateToken,
  requireRole('ADMIN'),
  validate([param('id').isMongoId().withMessage('Invalid tour ID')]),
  tourController.deleteTour
);

module.exports = router;
