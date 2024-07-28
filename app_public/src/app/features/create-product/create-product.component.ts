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
 * Component for creating a new product.
 *
 * This component provides a form to create a new product with fields for name, SKU, and quantity.
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
   * Form group for creating a product.
   */
  createProductForm: FormGroup;

  /**
   * Constructor to initialize the form builder and dialog reference.
   *
   * @param {FormBuilder} fb - The FormBuilder service to create form controls.
   * @param {MatDialogRef<CreateProductComponent>} dialogRef - Reference to the dialog opened.
   * @param {InventoryService} inventoryService - Service to manage inventory data.
   * @param {MatSnackBar} snackBar - Service to display snack bar messages.
   * @param {AuthService} authService - Service to manage authentication.
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
   * Handle form submission.
   *
   * This method sends the form values to the server and closes the dialog.
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
   * Handle form cancellation.
   *
   * This method closes the dialog without submitting the form.
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
