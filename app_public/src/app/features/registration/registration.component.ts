// registration.component.ts
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
 * This component handles user registration.
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
  registrationForm: FormGroup;

  /**
   * Constructor to inject required services.
   *
   * @param fb
   * @param router
   * @param authService
   * @param snackBar
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
