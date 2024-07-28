const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

// Create the Notification model
const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
