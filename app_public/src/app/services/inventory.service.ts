import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../models/inventory-item.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private dataUrl = 'assets/inventory.json';

  constructor(private http: HttpClient) {}

  getInventory(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.dataUrl);
  }

  updateInventoryItem(item: InventoryItem): Observable<any> {
    return this.http.put(`${this.dataUrl}/${item.id}`, item);
  }

  deleteInventoryItem(id: number): Observable<any> {
    return this.http.delete(`${this.dataUrl}/${id}`);
  }
}
