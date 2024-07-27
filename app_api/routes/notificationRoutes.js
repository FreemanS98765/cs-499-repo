const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Get all notifications
router.get('/notifications', notificationController.getNotifications);

// Add a notification
router.post('/notifications', notificationController.addNotification);

// Delete a notification
router.delete('/notifications/:id', notificationController.deleteNotification);

module.exports = router;