import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../core/services/notification.service';
import { Notification } from '../../core/models/notification.model';

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
export class NotificationsComponent implements OnInit {
  /** Indicates whether notifications are enabled or disabled */
  notificationsState: boolean = true;

  /** Notifications data */
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  /**
   * Loads notifications data.
   */
  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => {
        console.error('Error loading notifications:', error);
      }
    );
  }

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
   * @param {string} id - The ID of the notification to be deleted.
   */
  deleteNotification(id: string): void {
    this.notificationService.deleteNotification(id).subscribe(
      () => {
        this.notifications = this.notifications.filter(
          (notification) => notification._id !== id
        );
      },
      (error) => {
        console.error('Error deleting notification', error);
      }
    );
  }
}
