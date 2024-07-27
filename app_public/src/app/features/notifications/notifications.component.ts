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
  notificationsState: boolean = true;

  notifications = [
    { id: 1, title: 'Deleted item: New Product', date: '2024-06-23 21:08:43' },
    { id: 2, title: 'Deleted item: sdfas', date: '2024-06-23 21:08:45' },
    { id: 3, title: 'New item added: dsaf', date: '2024-06-23 21:08:57' },
  ];

  toggleNotifications(event: any): void {
    this.notificationsState = event.checked;
  }

  deleteNotification(id: number): void {
    this.notifications = this.notifications.filter(
      (notification) => notification.id !== id
    );
  }
}
