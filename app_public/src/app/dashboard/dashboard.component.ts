import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { InventoryService } from '../services/inventory.service';
import { InventoryItem } from '../models/inventory-item.model';
import { CreateProductComponent } from '../create-product/create-product.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule, MatIconModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  host: { class: 'dashboard-view' },
})
export class DashboardComponent implements OnInit {
  inventory: InventoryItem[] = [];
  displayedColumns: string[] = ['name', 'sku', 'quantity', 'actions'];

  constructor(
    private inventoryService: InventoryService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventoryService.getInventory().subscribe((data) => {
      this.inventory = data;
      console.log(this.inventory);
    });
  }

  openCreateProductDialog(): void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '400px',
      data: { name: '', sku: '', quantity: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  toggleEditMode(item: InventoryItem): void {
    item.isEditing = !item.isEditing;
  }

  saveItem(item: InventoryItem): void {
    item.isEditing = false;
    this.inventoryService.updateInventoryItem(item).subscribe(() => {
      this.loadInventory();
    });
  }

  deleteItem(item: InventoryItem): void {
    this.inventoryService.deleteInventoryItem(item.id).subscribe(() => {
      this.loadInventory();
    });
  }
}
