import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

/**
 * Component for creating a new product.
 *
 * This component provides a form to create a new product with fields for name, SKU, and quantity.
 */
@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
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
   */
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateProductComponent>
  ) {
    // Initialize the form with empty values
    this.createProductForm = this.fb.group({
      name: [''],
      sku: [''],
      quantity: [''],
    });
  }

  /**
   * Handle form submission.
   *
   * This method logs the form values to the console and closes the dialog.
   */
  onSubmit(): void {
    // TODO: Implement product add when server is ready
    console.log(this.createProductForm.value);
    this.dialogRef.close();
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
