const Booking = require('../models/Booking');
const Notification = require('../models/Notification');
const Tour = require('../models/Tour');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

exports.getAllBookings = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.user.role === 'CUSTOMER') {
    filter.customerId = req.user._id;
  }
  const bookings = await Booking.find(filter).sort({ createdAt: -1 });
  res.json({ bookings });
});

exports.getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new AppError('Booking not found', 404);

  if (req.user.role === 'CUSTOMER' && booking.customerId.toString() !== req.user._id.toString()) {
    throw new AppError('Not authorized', 403);
  }

  res.json({ booking });
});

exports.createBooking = asyncHandler(async (req, res) => {
  const { tourId, startDate, endDate, numPeople, totalPrice, destination, insurance } = req.body;

  const tour = await Tour.findById(tourId);
  if (!tour) throw new AppError('Tour not found', 404);

  const booking = await Booking.create({
    tourId,
    customerId: req.user._id,
    startDate,
    endDate,
    numPeople,
    totalPrice,
    destination,
    insurance: insurance || undefined,
    status: 'PENDING',
  });

  await Notification.create({
    message: `${req.user.name} booked "${tour.name}" for ${numPeople} person(s)`,
    actorName: req.user.name,
    actorRole: 'CUSTOMER',
    forRole: 'STAFF',
  });

  res.status(201).json({ booking });
});

exports.updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!booking) throw new AppError('Booking not found', 404);

  await Notification.create({
    message: `Your booking has been ${status.toLowerCase()}`,
    actorName: req.user.name,
    actorRole: req.user.role,
    forRole: 'CUSTOMER',
  });

  res.json({ booking });
});
