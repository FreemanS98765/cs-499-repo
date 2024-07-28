const User = require('../models/User');

// Register user
const registerUser = async (email, password) => {
    const user = new User({ email, password });
    await user.save();
}

// Authenticate user
const authenticateUser = async (email, password) => {
    const user = await User.findOne({ email, password });
    return user !== null;
};

module.exports = {
    registerUser,
    authenticateUser,
};