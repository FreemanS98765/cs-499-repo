/**
 * @fileOverview Interface for defining the structure of an Inventory Item.
 */

/**
 * @interface InventoryItem
 * @description Represents an item in the inventory, including its unique identifier, name, SKU, quantity, and an optional editing state.
 * 
 * @property {string} _id - The unique identifier for the inventory item.
 * @property {string} name - The name of the inventory item.
 * @property {string} sku - The Stock Keeping Unit (SKU) identifier for the inventory item.
 * @property {number} quantity - The quantity of the inventory item in stock.
 * @property {boolean} [isEditing] - An optional property to indicate whether the item is currently being edited.
 */
export interface InventoryItem {
  _id: string;
  name: string;
  sku: string;
  quantity: number;
  isEditing?: boolean; // Optional property for toggling edit mode
}
