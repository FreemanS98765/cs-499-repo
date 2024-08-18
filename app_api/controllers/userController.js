const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Registers a new user by creating a record in the database.
 * 
 * @param {Object} req - The request object containing the user's email and password.
 * @param {Object} res - The response object for sending back a JSON Web Token or an error message.
 * @returns {void}
 */
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    user = new User({ email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

    // Return JSON Web Token
    const payload = { user: { id: user._id } };
    jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

/**
 * Logs in a user by verifying credentials and returning a JSON Web Token.
 * 
 * @param {Object} req - The request object containing the user's email and password.
 * @param {Object} res - The response object for sending back a JSON Web Token or an error message.
 * @returns {void}
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "No account matching this email was found." });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    // Return JSON Web Token
    const payload = { user: { id: user._id } };
    jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        userId: user.id,
        notificationsEnabled: user.notificationsEnabled,
      });
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

/**
 * Retrieves all users from the database.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object for sending back the list of users.
 * @returns {void}
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

/**
 * Retrieves a single user by their ID.
 * 
 * @param {Object} req - The request object containing the user ID in params.
 * @param {Object} res - The response object for sending back the user data or an error message.
 * @returns {void}
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(500).send("Server error");
  }
};

/**
 * Updates a user's details in the database.
 * 
 * @param {Object} req - The request object containing the user ID in params and updated user data in the body.
 * @param {Object} res - The response object for sending back the updated user data or an error message.
 * @returns {void}
 */
exports.updateUser = async (req, res) => {
  const { email, password } = req.body;

  // Build user object
  const userFields = {};
  if (email) userFields.email = email;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    userFields.password = await bcrypt.hash(password, salt);
  }

  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(500).send("Server error");
  }
};

/**
 * Deletes a user from the database by their ID.
 * 
 * @param {Object} req - The request object containing the user ID in params.
 * @param {Object} res - The response object for sending back the deletion confirmation or an error message.
 * @returns {void}
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.remove();
    res.json({ msg: "User removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(500).send("Server error");
  }
};