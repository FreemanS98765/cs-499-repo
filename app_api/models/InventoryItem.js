const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @typedef InventoryItem
 * @property {string} name - The name of the inventory item.
 * @property {string} sku - The Stock Keeping Unit (SKU) for the inventory item, used for tracking purposes.
 * @property {number} quantity - The quantity of the inventory item available in stock.
 */

/**
 * Mongoose schema representing an inventory item in the application.
 * 
 * @type {mongoose.Schema<InventoryItem>}
 */
const InventoryItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

/**
 * Mongoose model representing an inventory item in the database.
 * 
 * @type {mongoose.Model<InventoryItem>}
 */
const InventoryItem = mongoose.model("InventoryItem", InventoryItemSchema);

module.exports = InventoryItem;