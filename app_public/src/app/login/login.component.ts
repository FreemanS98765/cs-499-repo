import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule],
  host: { 'class': 'login-view' }
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // TODO: Uncomment the following lines when ready to implement validation
    // this.loginForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(8)]],
    // });
  }

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
