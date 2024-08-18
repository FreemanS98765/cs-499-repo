const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

/**
 * @fileOverview Routes for handling notification operations in the application.
 * 
 * @requires express
 * @requires ../controllers/notificationController
 */

/**
 * Route to get all notifications.
 * 
 * @name GET /notifications
 * @memberof! express.Router
 * @inner
 * @function
 * @returns {Array<Object>} An array of notifications.
 */
router.get('/', notificationController.getNotifications);

/**
 * Route to add a new notification.
 * 
 * @name POST /notifications
 * @memberof! express.Router
 * @inner
 * @function
 * @param {Object} req.body - The data for the new notification.
 * @returns {Object} The newly created notification.
 */
router.post('/', notificationController.addNotification);

/**
 * Route to delete a notification by its ID.
 * 
 * @name DELETE /notifications/:id
 * @memberof! express.Router
 * @inner
 * @function
 * @param {string} id - The ID of the notification to delete.
 * @returns {string} A message confirming the deletion.
 */
router.delete('/:id', notificationController.deleteNotification);


/**
 * Route to toggle notifications on or off for a user.
 * 
 * @name POST /notifications/toggle-notifications
 * @memberof! express.Router
 * @inner
 * @function
 * @param {Object} req.body - The user ID and the new notification state.
 * @returns {string} A message confirming the notification state update.
 */
router.post('/toggle-notifications', notificationController.toggleNotifications);

module.exports = router;