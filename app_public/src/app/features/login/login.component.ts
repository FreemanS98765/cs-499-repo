import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet, RouterLink } from '@angular/router';

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
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink],
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
   */
  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the form group with empty values
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  /**
   * OnInit lifecycle hook to set up form validation on component initialization.
   */
  ngOnInit(): void {
    // TODO: Uncomment the following lines when ready to implement validation
    // this.loginForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(8)]],
    // });
  }

  /**
   * Handle form submission to log the user in.
   *
   * If form validation is enabled, this method would also check if the form is valid before
   * proceeding with the login process.
   */
  onSubmit(): void {
    // TODO: Uncomment the following lines when ready to implement validation
    // if (this.loginForm.valid) {
    //   console.log('Email: ' + this.loginForm.value.email);
    //   console.log('Password: ' + this.loginForm.value.password);

    //   // Navigate to the dashboard view
    //   this.router.navigate(['/dashboard']);
    // }

    // Navigate to the dashboard view
    this.router.navigate(['/dashboard']);
  }
}
