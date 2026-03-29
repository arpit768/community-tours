const config = require('../config');
const AppError = require('../utils/AppError');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal server error';

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    err = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(', ');
    err = new AppError(`Duplicate value for: ${field}`, 409);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    err = new AppError(messages.join('. '), 400);
  }

  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    err = new AppError('File too large. Maximum size is 5MB', 400);
  }

  console.error('ERROR:', err.message);

  res.status(err.statusCode).json({
    status: err.status || 'error',
    message: err.message,
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
  });
};
