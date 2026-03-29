const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

exports.getAllUsers = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.role) {
    const roles = req.query.role.split(',');
    filter.role = { $in: roles };
  }
  const users = await User.find(filter).select('-password').sort({ createdAt: -1 });
  res.json({ users });
});

exports.getUserById = asyncHandler(async (req, res) => {
  if (req.user.role !== 'ADMIN' && req.user._id.toString() !== req.params.id) {
    throw new AppError('Not authorized', 403);
  }
  const user = await User.findById(req.params.id).select('-password');
  if (!user) throw new AppError('User not found', 404);
  res.json({ user });
});

exports.updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
  if (!user) throw new AppError('User not found', 404);
  res.json({ user });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  if (req.user._id.toString() === req.params.id) {
    throw new AppError('Cannot delete your own account', 400);
  }
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new AppError('User not found', 404);
  res.json({ message: 'User deleted' });
});
