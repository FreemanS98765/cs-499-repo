import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

/**
 * @title Registration Component
 *
 * @description This component handles user registration. It provides a form for the user to enter their email and password,
 * validates the form input, and handles the registration process through the `AuthService`.
 */
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    MatSnackBarModule,
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  host: { class: 'registration-view' },
})
export class RegistrationComponent {
  /** @property {FormGroup} registrationForm - Form group for the registration form */
  registrationForm: FormGroup;

  /**
   * @constructor
   * @description Constructor to inject required services and initialize the registration form.
   *
   * @param {FormBuilder} fb - Form builder service to create the form group.
   * @param {Router} router - Router service to navigate between views.
   * @param {AuthService} authService - Authentication service to handle user registration.
   * @param {MatSnackBar} snackBar - Material snack bar service to display messages.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    // Initialize the form group
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  /**
   * @method onSubmit
   * @description Handle form submission to register the user.
   *
   * This method checks if the form is valid, and then calls the `AuthService` to register the user.
   * If registration is successful, it navigates to the login page. Otherwise, it shows an error message.
   */
  onSubmit(): void {
    if (this.registrationForm.valid) {
      const { email, password } = this.registrationForm.value;
      this.authService.register(email, password).subscribe(
        (response) => {
          this.snackBar.open('Registration successful', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/login']);
        },
        (error) => {
          this.snackBar.open(
            'Registration failed: ' + error.error.msg,
            'Close',
            { duration: 3000 }
          );
        }
      );
    } else {
      this.snackBar.open('Please fill in the form correctly', 'Close', {
        duration: 3000,
      });
    }
  }
}