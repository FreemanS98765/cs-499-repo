const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Get all inventory
router.get('/inventory', inventoryController.getInventory);

// Get inventory by ID
router.get('/inventory/:id', inventoryController.getInventoryById);

// Add inventory
router.post('/inventory', inventoryController.addInventory);

// Update inventory
router.put('/inventory/:id', inventoryController.updateInventory);

// Delete inventory
router.delete('/inventory/:id', inventoryController.deleteInventory);

module.exports = router;