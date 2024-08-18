const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @typedef User
 * @property {string} email - The user's email address, which must be unique.
 * @property {string} password - The user's hashed password.
 * @property {boolean} notificationsEnabled - Indicates whether the user has enabled notifications. Defaults to true.
 */

/**
 * Mongoose schema representing a user in the application.
 * 
 * @type {mongoose.Schema<User>}
 */
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  notificationsEnabled: {
    type: Boolean,
    default: true,
  },
});


/**
 * Mongoose model representing a user in the database.
 * 
 * @type {mongoose.Model<User>}
 */
const User = mongoose.model("User", UserSchema);

module.exports = User;