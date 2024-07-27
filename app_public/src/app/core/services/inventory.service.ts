import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../models/inventory-item.model';

/**
 * @title Inventory Service
 * 
 * This service handles operations related to inventory items, including fetching, updating, and deleting inventory items.
 */
@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private dataUrl = '/app/assets/inventory.json';

  /**
   * Constructor to inject the HttpClient service.
   * 
   * @param {HttpClient} http - The Angular HttpClient service.
   */
  constructor(private http: HttpClient) {}

  /**
   * Fetches the inventory items from the server.
   * 
   * @returns {Observable<InventoryItem[]>} An observable containing the list of inventory items.
   */
  getInventory(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.dataUrl);
  }

  /**
   * Updates an inventory item on the server.
   * 
   * @param {InventoryItem} item - The inventory item to update.
   * @returns {Observable<any>} An observable indicating the update operation result.
   */
  updateInventoryItem(item: InventoryItem): Observable<any> {
    return this.http.put(`${this.dataUrl}/${item.id}`, item);
  }

  /**
   * Deletes an inventory item from the server.
   * 
   * @param {number} id - The ID of the inventory item to delete.
   * @returns {Observable<any>} An observable indicating the delete operation result.
   */
  deleteInventoryItem(id: number): Observable<any> {
    return this.http.delete(`${this.dataUrl}/${id}`);
  }
}
