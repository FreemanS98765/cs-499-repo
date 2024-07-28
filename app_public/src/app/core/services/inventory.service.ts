import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../models/inventory-item.model';
import { AuthService } from './auth.service';

/**
 * @title Inventory Service
 *
 * This service handles operations related to inventory items, including fetching, updating, and deleting inventory items.
 */
@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private apiUrl = 'http://localhost:3000/api/inventory';

  /**
   * Constructor to inject the HttpClient service.
   *
   * @param {HttpClient} http - The Angular HttpClient service.
   * @param {AuthService} authService - The authentication service.
   */
  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Fetches the inventory items from the server.
   *
   * @returns {Observable<InventoryItem[]>} An observable containing the list of inventory items.
   */
  getInventory(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.apiUrl);
  }

  /**
   * Adds an inventory item to the server.
   *
   * @param {InventoryItem} item - The inventory item to add.
   * @returns {Observable<any>} An observable indicating the add operation result.
   */
  addInventoryItem(item: InventoryItem): Observable<any> {
    const userId = this.authService.getUserId(); // Retrieve the user ID
    return this.http.post(this.apiUrl, { ...item, userId });
  }

  /**
   * Updates an inventory item on the server.
   *
   * @param {InventoryItem} item - The inventory item to update.
   * @returns {Observable<any>} An observable indicating the update operation result.
   */
  updateInventoryItem(item: InventoryItem): Observable<any> {
    const userId = this.authService.getUserId(); // Retrieve the user ID
    return this.http.put(`${this.apiUrl}/${item._id}`, { ...item, userId });
  }

  /**
   * Deletes an inventory item from the server.
   *
   * @param {number} id - The ID of the inventory item to delete.
   * @returns {Observable<any>} An observable indicating the delete operation result.
   */
  deleteInventoryItem(id: string): Observable<any> {
    const userId = this.authService.getUserId(); // Retrieve the user ID
    return this.http.delete(`${this.apiUrl}/${id}`, { body: { userId } });
  }
}
