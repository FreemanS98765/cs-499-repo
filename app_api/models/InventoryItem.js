const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the InventoryItem schema
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

// Create the InventoryItem model
const InventoryItem = mongoose.model("InventoryItem", InventoryItemSchema);

module.exports = InventoryItem;
