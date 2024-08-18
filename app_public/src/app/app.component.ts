import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

/**
 * @title App Component
 *
 * @description This is the root component of the application. It serves as the main container for the application and includes
 * the header and footer components. It also manages the routing within the application.
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
  /** @property {string} title - The title of the application */
  title = 'inventory-management-app-public';

  /**
   * @constructor
   * @description Constructor to inject the Router service.
   *
   * @param {Router} router - The Angular Router service, used to manage navigation within the application.
   */
  constructor(public router: Router) {}
}