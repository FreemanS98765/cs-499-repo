import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

/**
 * @title Notifications Component
 *
 * This component displays notifications and provides functionality to toggle notifications on/off and delete individual notifications.
 */
@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatSlideToggleModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
  host: { class: 'notifications-view' },
})
export class NotificationsComponent {
  /** Indicates whether notifications are enabled or disabled */
  notificationsState: boolean = true;

  /** Sample notifications data */
  NOTIFICATIONS = [
    { id: 1, title: 'Deleted item: New Product', date: '2024-06-23 21:08:43' },
    { id: 2, title: 'Deleted item: sdfas', date: '2024-06-23 21:08:45' },
    { id: 3, title: 'New item added: dsaf', date: '2024-06-23 21:08:57' },
  ];

  /**
   * Toggles the notifications state.
   *
   * @param {any} event - The event object containing the toggle state.
   */
  toggleNotifications(event: any): void {
    this.notificationsState = event.checked;
  }

  /**
   * Deletes a notification by ID.
   *
   * @param {number} id - The ID of the notification to be deleted.
   */
  deleteNotification(id: number): void {
    this.NOTIFICATIONS = this.NOTIFICATIONS.filter(
      (notification) => notification.id !== id
    );
  }
}
