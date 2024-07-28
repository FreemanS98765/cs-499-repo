import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

/**
 * @title Login Component
 *
 * This component provides the login functionality for the application. It displays a form
 * for users to enter their email and password, and handles form submission to navigate to
 * the dashboard upon successful login.
 */
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, RouterLink, MatSnackBarModule],
  host: { class: 'login-view' },
})
export class LoginComponent implements OnInit {
  /** Form group for the login form */
  loginForm: FormGroup;

  /**
   * Constructor to inject required services.
   *
   * @param {FormBuilder} fb - Form builder service to create the form group.
   * @param {Router} router - Router service to navigate between views.
   * @param {AuthService} authService - Authentication service to handle user login.
   * @param {MatSnackBar} snackBar - Material snack bar service to display messages.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    // Initialize the form group with empty values and validation rules
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  /**
   * Lifecycle method to initialize the component.
   */
  ngOnInit(): void {}

  /**
   * Handle form submission to log the user in.
   *
   * This method checks if the form is valid, and then calls the AuthService to authenticate the user.
   * If authentication is successful, it navigates to the dashboard. Otherwise, it shows an error message.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.snackBar.open('Invalid email or password', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Please fill in the form correctly', 'Close', {
        duration: 3000,
      });
    }
  }
}
