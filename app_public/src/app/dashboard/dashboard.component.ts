import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { InventoryService } from '../services/inventory.service';
import { InventoryItem } from '../models/inventory-item.model';
import { CreateProductComponent } from '../create-product/create-product.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  host: { class: 'dashboard-view' },
})
export class DashboardComponent implements OnInit {
  inventory: InventoryItem[] = [];

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
}
