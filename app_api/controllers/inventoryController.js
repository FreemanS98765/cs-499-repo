const InventoryItem = require("../models/InventoryItem");
const Notification = require("../models/Notification");
const smsService = require("../../app_server/services/smsService");
const User = require("../models/User");

/**
 * Adds a new inventory item to the database.
 * If the user has notifications enabled, it triggers a notification and sends an SMS.
 * 
 * @param {Object} req - The request object containing item details and userId.
 * @param {Object} res - The response object for sending back the appropriate response.
 * @returns {void}
 */
exports.addInventoryItem = async (req, res) => {
  try {
    const { name, sku, quantity, userId } = req.body; // Retrieve userId from the request body

    const newItem = new InventoryItem({ name, sku, quantity });
    await newItem.save();

    // Check if notifications are enabled for the user
    const user = await User.findById(userId);

    if (user && user.notificationsEnabled) {
      // Add notification
      const notification = new Notification({
        msg: `New item added: ${newItem.name}`,
      });
      await notification.save();

      // Send SMS notification
      smsService.sendSMSNotification(`New item added: ${newItem.name}`);
    }

    res.status(201).json({ newItem, message: "Item added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Retrieves all inventory items from the database.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object for sending back the list of items.
 * @returns {void}
 */
exports.getInventory = async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Retrieves a single inventory item by its ID.
 * 
 * @param {Object} req - The request object containing the item ID in params.
 * @param {Object} res - The response object for sending back the item details.
 * @returns {void}
 */
exports.getInventoryById = async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Updates an existing inventory item by its ID.
 * If the user has notifications enabled, it triggers a notification and sends an SMS.
 * 
 * @param {Object} req - The request object containing the updated item details and userId.
 * @param {Object} res - The response object for sending back the updated item details.
 * @returns {void}
 */
exports.updateInventory = async (req, res) => {
  try {
    const { userId } = req.body; // Ensure userId is passed in the request body
    const item = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Check if notifications are enabled for the user
    const user = await User.findById(userId);

    if (user && user.notificationsEnabled) {
      // Add notification
      const notification = new Notification({
        msg: `Updated item: ${item.name}`,
      });
      await notification.save();

      // Send SMS notification
      smsService.sendSMSNotification(`Updated item: ${item.name}`);
    }

    res.status(200).json({ item, message: "Item updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Deletes an inventory item by its ID.
 * If the user has notifications enabled, it triggers a notification and sends an SMS.
 * 
 * @param {Object} req - The request object containing the item ID and userId.
 * @param {Object} res - The response object for sending back the deletion confirmation.
 * @returns {void}
 */
exports.deleteInventory = async (req, res) => {
  try {
    const { userId } = req.body; // Ensure userId is passed in the request body
    const item = await InventoryItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Check if notifications are enabled for the user
    const user = await User.findById(userId);

    if (user && user.notificationsEnabled) {
      // Add notification
      const notification = new Notification({
        msg: `Deleted item: ${item.name}`,
      });
      await notification.save();

      // Send SMS notification
      smsService.sendSMSNotification(`Deleted item: ${item.name}`);
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};