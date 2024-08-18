const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

/**
 * @fileOverview Routes for handling inventory operations in the application.
 * 
 * @requires express
 * @requires ../controllers/inventoryController
 */

/**
 * Route to get all inventory items.
 * 
 * @name GET /inventory
 * @memberof! express.Router
 * @inner
 * @function
 * @returns {Array<Object>} An array of inventory items.
 */
router.get('/', inventoryController.getInventory);

/**
 * Route to get a single inventory item by its ID.
 * 
 * @name GET /inventory/:id
 * @memberof! express.Router
 * @inner
 * @function
 * @param {string} id - The ID of the inventory item.
 * @returns {Object} The inventory item with the specified ID.
 */
router.get('/:id', inventoryController.getInventoryById);


/**
 * Route to add a new inventory item.
 * 
 * @name POST /inventory
 * @memberof! express.Router
 * @inner
 * @function
 * @param {Object} req.body - The data for the new inventory item.
 * @returns {Object} The newly created inventory item.
 */
router.post('/', inventoryController.addInventoryItem);

/**
 * Route to update an existing inventory item by its ID.
 * 
 * @name PUT /inventory/:id
 * @memberof! express.Router
 * @inner
 * @function
 * @param {string} id - The ID of the inventory item to update.
 * @param {Object} req.body - The updated data for the inventory item.
 * @returns {Object} The updated inventory item.
 */
router.put('/:id', inventoryController.updateInventory);

/**
 * Route to delete an inventory item by its ID.
 * 
 * @name DELETE /inventory/:id
 * @memberof! express.Router
 * @inner
 * @function
 * @param {string} id - The ID of the inventory item to delete.
 * @returns {string} A message confirming the deletion.
 */
router.delete('/:id', inventoryController.deleteInventory);

module.exports = router;