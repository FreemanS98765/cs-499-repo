// registration.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
/**
 * @title Registration Component
 *
 * This component handles user registration.
 */
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  host: { class: 'registration-view' },
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the form group
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Email: ' + this.registrationForm.value.email);
      console.log('Password: ' + this.registrationForm.value.password);
      // Navigate to the login view
      this.router.navigate(['/dashboard']);
    }
  }
}
