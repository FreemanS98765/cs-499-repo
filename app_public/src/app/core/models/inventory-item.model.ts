// Define an interface for Inventory Item, specifying the structure of each item in the inventory
export interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  isEditing?: boolean; // Optional property for toggling edit mode
}
