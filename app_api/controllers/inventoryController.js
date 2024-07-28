const InventoryItem = require("../models/InventoryItem");
const Notification = require("../models/Notification");
const smsService = require("../../app_server/services/smsService");

// Add an inventory item
exports.addInventoryItem = async (req, res) => {
  try {
    const newItem = new InventoryItem(req.body);
    await newItem.save();

    // Add notification
    const notification = new Notification({
      msg: `New item added: ${newItem.name}`,
    });
    await notification.save();

    // Send SMS notification
    const smsMessage = `New item added: ${newItem.name}`;
    smsService.sendSMSNotification(smsMessage);

    res.status(201).json({ newItem, message: smsMessage });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all inventory items
exports.getInventory = async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single inventory item by ID
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

// Update an inventory item
exports.updateInventory = async (req, res) => {
  try {
    const item = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Add notification
    const notification = new Notification({
      msg: `Updated item: ${item.name}`,
    });
    await notification.save();

    // Send SMS notification
    const smsMessage = `Updated item: ${item.name}`;
    smsService.sendSMSNotification(smsMessage);

    res.status(200).json({ item, message: smsMessage });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an inventory item
exports.deleteInventory = async (req, res) => {
  try {
    const item = await InventoryItem.findByIdAndDelete(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Add notification
    const notification = new Notification({
      msg: `Deleted item: ${item.name}`,
    });
    await notification.save();

    // Send SMS notification
    const smsMessage = `Deleted item: ${item.name}`;
    smsService.sendSMSNotification(smsMessage);

    res.status(200).json({ message: smsMessage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
