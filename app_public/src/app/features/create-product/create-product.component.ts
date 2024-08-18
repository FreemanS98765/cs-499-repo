import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InventoryService } from '../../core/services/inventory.service';
import { InventoryItem } from '../../core/models/inventory-item.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';

/**
 * @class CreateProductComponent
 * @classdesc Component for creating a new product in the inventory management system.
 *
 * This component provides a form that allows the user to input product details, including the name, SKU,
 * and quantity. Upon submission, the product is added to the inventory, and a notification is displayed.
 * The component can also be closed without submitting the form.
 */
@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  /**
   * @property {FormGroup} createProductForm - The form group for the product creation form.
   */
  createProductForm: FormGroup;

  /**
   * @constructor
   * @description Initializes the component with required services and form controls.
   * @param {FormBuilder} fb - The FormBuilder service to create form controls.
   * @param {MatDialogRef<CreateProductComponent>} dialogRef - Reference to the dialog instance.
   * @param {InventoryService} inventoryService - Service to interact with inventory-related operations.
   * @param {MatSnackBar} snackBar - Service to display snack bar notifications.
   * @param {AuthService} authService - Service to handle user authentication and authorization.
   */
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateProductComponent>,
    private inventoryService: InventoryService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    // Initialize the form with empty values and validators
    this.createProductForm = this.fb.group({
      name: ['', Validators.required],
      sku: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
    });
  }

  /**
   * @method onSubmit
   * @description Handles the submission of the product creation form.
   * If the form is valid, the new product is added to the inventory, and a success message is displayed.
   */
  onSubmit(): void {
    if (this.createProductForm.valid) {
      const newProduct: InventoryItem = this.createProductForm.value;
      const userId = this.authService.getUserId();
      this.inventoryService.addInventoryItem(newProduct).subscribe(
        (result) => {
          this.dialogRef.close(result.newItem); // Pass the result back to the caller
          this.snackBar.open(result.message, 'Close', { duration: 3000 });
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  /**
   * @method onCancel
   * @description Closes the dialog without submitting the form.
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
