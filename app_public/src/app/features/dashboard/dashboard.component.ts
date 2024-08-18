import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { InventoryService } from '../../core/services/inventory.service';
import { InventoryItem } from '../../core/models/inventory-item.model';
import { CreateProductComponent } from '../create-product/create-product.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

/**
 * @title Dashboard Component
 *
 * This component provides the main dashboard view for the inventory management application.
 * It displays a table of inventory items and allows for creating, editing, and deleting items.
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
    RouterOutlet,
    RouterLink,
    MatSnackBarModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  host: { class: 'dashboard-view' },
})
export class DashboardComponent implements OnInit, AfterViewInit {
  /** @property {InventoryItem[]} inventory - Array of inventory items. */
  inventory: InventoryItem[] = [];

  /** @property {string[]} displayedColumns - Columns to be displayed in the table. */
  displayedColumns: string[] = ['name', 'sku', 'quantity', 'actions'];

  /** @property {MatTableDataSource<InventoryItem>} dataSource - Data source for the table. */
  dataSource = new MatTableDataSource<InventoryItem>(this.inventory);

  /**
   * @constructor
   * @description Constructor to inject required services.
   *
   * @param {InventoryService} inventoryService - Service to manage inventory data.
   * @param {MatDialog} dialog - Service to manage dialogs.
   * @param {LiveAnnouncer} _liveAnnouncer - Service to announce changes for accessibility.
   * @param {MatSnackBar} snackBar - Service to display snack bar messages.
   */
  constructor(
    private inventoryService: InventoryService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: MatSnackBar
  ) {}

  /** @property {MatSort} sort - ViewChild to access the table sorting directive. */
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * @method ngOnInit
   * @description OnInit lifecycle hook to load inventory on component initialization.
   */
  ngOnInit(): void {
    this.loadInventory();
  }

  /**
   * @method ngAfterViewInit
   * @description AfterViewInit lifecycle hook to set the table sorting after the view is initialized.
   */
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  /**
   * @method loadInventory
   * @description Load inventory items from the service.
   */
  loadInventory(): void {
    this.inventoryService.getInventory().subscribe(
      (data) => {
        this.inventory = data;
        this.dataSource.data = this.inventory;
      },
      (error) => {
        console.error('Error loading inventory', error);
      }
    );
  }

  /**
   * @method openCreateProductDialog
   * @description Open the create product dialog.
   */
  openCreateProductDialog(): void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '400px',
      data: { name: '', sku: '', quantity: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadInventory();
      }
    });
  }

  /**
   * @method toggleEditMode
   * @description Toggle edit mode for an inventory item.
   *
   * @param {InventoryItem} item - The inventory item to toggle edit mode.
   */
  toggleEditMode(item: InventoryItem): void {
    item.isEditing = !item.isEditing;
  }

  /**
   * @method saveItem
   * @description Save an inventory item.
   *
   * @param {InventoryItem} item - The inventory item to save.
   */
  saveItem(item: InventoryItem): void {
    item.isEditing = false;
    this.inventoryService.updateInventoryItem(item).subscribe(
      () => {
        this.loadInventory();
      },
      (error) => {
        console.error('Error updating inventory item', error);
      }
    );
  }

  /**
   * @method deleteItem
   * @description Delete the specified inventory item.
   *
   * @param {InventoryItem} item - The inventory item to delete.
   */
  deleteItem(item: InventoryItem): void {
    this.inventoryService.deleteInventoryItem(item._id).subscribe(
      (result) => {
        this.loadInventory();
        this.snackBar.open(result.message, 'Close', { duration: 3000 });
      },
      (error) => {
        console.error('Error deleting inventory item', error);
      }
    );
  }

  /**
   * @method announceItemUpdate
   * @description Announce item update for accessibility.
   *
   * @param {InventoryItem} item - The inventory item that was updated.
   */
  announceItemUpdate(item: InventoryItem): void {
    this._liveAnnouncer.announce(`Item updated: ${item.name}`);
  }

  /**
   * @method announceItemDelete
   * @description Announce item delete for accessibility.
   *
   * @param {InventoryItem} item - The inventory item that was deleted.
   */
  announceItemDelete(item: InventoryItem): void {
    this._liveAnnouncer.announce(`Item deleted: ${item.name}`);
  }

  /**
   * @method announceSortChange
   * @description Announce sort change for accessibility.
   *
   * @param {Sort} sortState - The new sort state.
   */
  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}