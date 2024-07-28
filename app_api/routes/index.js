const express = require('express');
const router = express.Router();

// Import other route modules
const userRoutes = require('./userRoutes');
const inventoryRoutes = require('./inventoryRoutes');
const notificationRoutes = require('./notificationRoutes');

// Use the route modules
router.use('/users', userRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;
