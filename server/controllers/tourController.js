const Tour = require('../models/Tour');
const Notification = require('../models/Notification');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

exports.getAllTours = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.location) filter.location = req.query.location;
  if (req.query.type) filter.type = req.query.type;
  if (req.query.available !== undefined) filter.available = req.query.available === 'true';
  if (req.query.status) filter.verificationStatus = req.query.status;

  const tours = await Tour.find(filter).sort({ createdAt: -1 });
  res.json({ tours });
});

exports.getTourById = asyncHandler(async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) throw new AppError('Tour not found', 404);
  res.json({ tour });
});

exports.createTour = asyncHandler(async (req, res) => {
  const {
    name, type, pricePerPerson, location, image, available,
    features, description, duration, maxGroupSize, difficulty,
    verificationStatus,
  } = req.body;

  const tour = await Tour.create({
    name, type, pricePerPerson, location, image,
    available: available !== undefined ? available : true,
    features: features || [],
    description: description || '',
    duration, maxGroupSize,
    difficulty: difficulty || 'Moderate',
    verificationStatus: verificationStatus || 'PENDING',
    createdBy: req.user._id,
  });

  if (req.user.role === 'STAFF') {
    await Notification.create({
      message: `${req.user.name} (Staff) added a new tour package: "${name}"`,
      actorName: req.user.name,
      actorRole: 'STAFF',
      forRole: 'ADMIN',
    });
  }

  res.status(201).json({ tour });
});

exports.updateTour = asyncHandler(async (req, res) => {
  const prevTour = await Tour.findById(req.params.id);
  if (!prevTour) throw new AppError('Tour not found', 404);

  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (
    req.user.role === 'STAFF' &&
    req.body.verificationStatus &&
    req.body.verificationStatus !== prevTour.verificationStatus
  ) {
    const action = req.body.verificationStatus === 'VERIFIED' ? 'verified' : 'rejected';
    await Notification.create({
      message: `${req.user.name} (Staff) ${action} tour: "${prevTour.name}"`,
      actorName: req.user.name,
      actorRole: 'STAFF',
      forRole: 'ADMIN',
    });
  }

  res.json({ tour });
});

exports.deleteTour = asyncHandler(async (req, res) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) throw new AppError('Tour not found', 404);
  res.json({ message: 'Tour deleted successfully' });
});
