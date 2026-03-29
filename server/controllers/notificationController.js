const Notification = require('../models/Notification');
const asyncHandler = require('../utils/asyncHandler');

exports.getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    forRole: { $in: [req.user.role, 'ALL'] },
  })
    .sort({ createdAt: -1 })
    .limit(50);

  const withReadStatus = notifications.map((n) => {
    const obj = n.toJSON();
    obj.read = n.readBy.some((id) => id.toString() === req.user._id.toString());
    return obj;
  });

  res.json({ notifications: withReadStatus });
});

exports.markAllRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    {
      forRole: { $in: [req.user.role, 'ALL'] },
      readBy: { $ne: req.user._id },
    },
    { $addToSet: { readBy: req.user._id } }
  );
  res.json({ message: 'Notifications marked as read' });
});
