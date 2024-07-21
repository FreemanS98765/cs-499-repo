import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { InventoryService } from '../services/inventory.service';
import { InventoryItem } from '../models/inventory-item.model';
import { CreateProductComponent } from '../create-product/create-product.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';

/**
 * @title Dashboard Component
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatSortModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  host: { class: 'dashboard-view' },
})
export class DashboardComponent implements OnInit, AfterViewInit {
  inventory: InventoryItem[] = [];
  displayedColumns: string[] = ['name', 'sku', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<InventoryItem>(this.inventory);

  constructor(
    private inventoryService: InventoryService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadInventory();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  loadInventory(): void {
    this.inventoryService.getInventory().subscribe((data) => {
      this.inventory = data;
      this.dataSource.data = this.inventory;
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
    // TODO: Implement delete functionality when server is ready
    // this.inventoryService.deleteInventoryItem(item.id).subscribe(() => {
    //   this.loadInventory();
    // });

    console.log('Delete item:', item);
  }

  announceItemUpdate(item: InventoryItem): void {
    this._liveAnnouncer.announce(`Item updated: ${item.name}`);
  }

  announceItemDelete(item: InventoryItem): void {
    this._liveAnnouncer.announce(`Item deleted: ${item.name}`);
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
