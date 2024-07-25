import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

/**
 * @title Notifications Component
 */
@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
  host: { class: 'notifications-view' },
})
export class NotificationsComponent {

}
