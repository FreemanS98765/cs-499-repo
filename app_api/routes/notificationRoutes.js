const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Get all notifications
router.get('/', notificationController.getNotifications);

// Add a notification
router.post('/', notificationController.addNotification);

// Delete a notification
router.delete('/:id', notificationController.deleteNotification);

// Toggle notifications
router.post('/toggle-notifications', notificationController.toggleNotifications);

module.exports = router;