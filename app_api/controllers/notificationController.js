// notificationController.js
const Notification = require("../models/Notification");
const User = require("../models/User");

// Get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a notification
exports.addNotification = async (req, res) => {
  const { msg } = req.body;

  try {
    const newNotification = new Notification({
      msg,
      date: new Date(),
    });

    const notification = await newNotification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({ msg: "Notification not found" });
    }

    res.json({ msg: "Notification removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Notification not found" });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.toggleNotifications = async (req, res) => {
  try {
    const { userId, notificationsEnabled } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.notificationsEnabled = notificationsEnabled;
    await user.save();
    res.status(200).json({ msg: "Notifications state updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
