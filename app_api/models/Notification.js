const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @typedef Notification
 * @property {string} msg - The message content of the notification.
 * @property {Date} date - The date and time when the notification was created.
 */

/**
 * Mongoose schema representing a notification in the application.
 * 
 * @type {mongoose.Schema<Notification>}
 */
const NotificationSchema = new Schema({
  msg: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Set the default value to the current date
  },
});


/**
 * Mongoose model representing a notification in the database.
 * 
 * @type {mongoose.Model<Notification>}
 */
const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;