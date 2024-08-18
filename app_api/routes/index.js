const express = require('express');
const router = express.Router();

/**
 * @fileOverview Main router for the application. This file combines different route modules and organizes the API endpoints.
 * 
 * @requires express
 * @requires ./userRoutes
 * @requires ./inventoryRoutes
 * @requires ./notificationRoutes
 */

// Import route modules
const userRoutes = require('./userRoutes');
const inventoryRoutes = require('./inventoryRoutes');
const notificationRoutes = require('./notificationRoutes');

/**
 * Use the userRoutes module for handling routes related to user operations.
 * 
 * @name /users
 * @memberof! express.Router
 * @inner
 * @type {express.Router}
 */
router.use('/users', userRoutes);

/**
 * Use the inventoryRoutes module for handling routes related to inventory operations.
 * 
 * @name /inventory
 * @memberof! express.Router
 * @inner
 * @type {express.Router}
 */
router.use('/inventory', inventoryRoutes);

/**
 * Use the notificationRoutes module for handling routes related to notification operations.
 * 
 * @name /notifications
 * @memberof! express.Router
 * @inner
 * @type {express.Router}
 */
router.use('/notifications', notificationRoutes);

module.exports = router;