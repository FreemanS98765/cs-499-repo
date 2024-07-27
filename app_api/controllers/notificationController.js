// notificationController.js
const Notification = require("../models/Notification");

// Get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Add a notification
exports.addNotification = async (req, res) => {
  const { text } = req.body;

  try {
    const newNotification = new Notification({
      text,
      date: new Date(),
    });

    const notification = await newNotification.save();
    res.json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ msg: "Notification not found" });
    }

    await notification.remove();
    res.json({ msg: "Notification removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Notification not found" });
    }
    res.status(500).send("Server error");
  }
};
