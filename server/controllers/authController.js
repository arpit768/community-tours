const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

const signToken = (userId) =>
  jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });

exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new AppError('Email already registered', 409);
  }

  const allowedRoles = ['CUSTOMER', 'STAFF', 'ADMIN'];
  const assignedRole = allowedRoles.includes(role) ? role : 'CUSTOMER';

  const user = await User.create({ name, email, password, role: assignedRole });
  const token = signToken(user._id);

  res.status(201).json({ token, user });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = signToken(user._id);
  res.json({ token, user });
});

exports.getMe = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

exports.logout = asyncHandler(async (req, res) => {
  res.json({ message: 'Logged out successfully' });
});
