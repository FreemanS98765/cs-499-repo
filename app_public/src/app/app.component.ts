import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

/**
 * @title App Component
 * 
 * This is the root component of the application, which includes the header and footer components and manages routing.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  /** The title of the application */
  title = 'inventory-management-app-public';

  /**
   * Constructor to inject the Router service.
   * 
   * @param {Router} router - The Angular Router service.
   */
  constructor(public router: Router) {}
}
