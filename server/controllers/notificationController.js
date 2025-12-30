import Notification from "../models/notificationModel.js";

export const createNotification = async (req, res) => {
  try {
    const { title, message, type } = req.body;
    const userId = req.user.id;

    const notification = new Notification({ userId, title, message, type });
    await notification.save();

    res.json({ success: true, notification });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create notification",
      error: error.message,
    });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.find({ userId }).sort({
      createdAt: -1,
    });

    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching notifications",
      error: error.message,
    });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId },
      { isRead: true },
      { new: true }
    );

    res.json({ success: true, notification });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error marking notification as read",
      error: error.message,
    });
  }
};
