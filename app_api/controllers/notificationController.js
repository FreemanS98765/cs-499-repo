// notificationController.js
const Notification = require("../models/Notification");
const User = require("../models/User");


/**
 * Retrieves all notifications from the database.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object for sending back the list of notifications.
 * @returns {void}
 */
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Adds a new notification to the database.
 * 
 * @param {Object} req - The request object containing the notification message.
 * @param {Object} res - The response object for sending back the newly created notification.
 * @returns {void}
 */
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

/**
 * Deletes a notification by its ID from the database.
 * 
 * @param {Object} req - The request object containing the notification ID in params.
 * @param {Object} res - The response object for sending back the deletion confirmation.
 * @returns {void}
 */
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

/**
 * Toggles the notification settings for a user.
 * 
 * @param {Object} req - The request object containing the userId and notificationsEnabled status.
 * @param {Object} res - The response object for sending back the update confirmation.
 * @returns {void}
 */
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
    res.status(500).send("Server error");
  }
};