const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Get all inventory
router.get('/', inventoryController.getInventory);

// Get inventory by ID
router.get('/:id', inventoryController.getInventoryById);

// Add inventory
router.post('/', inventoryController.addInventoryItem);

// Update inventory
router.put('/:id', inventoryController.updateInventory);

// Delete inventory
router.delete('/:id', inventoryController.deleteInventory);

module.exports = router;