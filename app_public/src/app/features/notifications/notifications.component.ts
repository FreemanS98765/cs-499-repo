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
import { AuthService } from '../../core/services/auth.service';

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
  /** @property {boolean} notificationsState - Indicates whether notifications are enabled or disabled. */
  notificationsState: boolean = true;

  /** @property {Notification[]} notifications - Stores the list of notifications retrieved from the server. */
  notifications: Notification[] = [];

  /** @property {string} userId - Stores the current user's ID. */
  userId: string;

  /**
   * @constructor
   * @param {NotificationService} notificationService - The service for managing notifications.
   * @param {AuthService} authService - The service for managing authentication and user information.
   */
  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserId();
  }

  /**
   * @method ngOnInit
   * @description Lifecycle hook that is called after data-bound properties of a directive are initialized. Used to load initial data.
   */
  ngOnInit(): void {
    this.loadNotifications();
    this.loadNotificationState();
  }

  /**
   * @method loadNotifications
   * @description Fetches the list of notifications from the server.
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
   * @method loadNotificationState
   * @description Retrieves the current notification state from local storage.
   */
  loadNotificationState(): void {
    this.notificationsState = this.authService.getNotificationsState();
  }

  /**
   * @method toggleNotifications
   * @description Toggles the notifications state on or off based on user input.
   * @param {any} event - The event object containing the toggle state.
   */
  toggleNotifications(event: any): void {
    this.notificationsState = event.checked;
    this.authService.setNotificationsState(this.notificationsState); // Update local storage
    this.notificationService
      .toggleNotifications(this.userId, this.notificationsState)
      .subscribe(
        (response) => {
          console.log(response.msg);
        },
        (error) => {
          console.error('Error toggling notifications:', error);
        }
      );
  }

  /**
   * @method deleteNotification
   * @description Deletes a specific notification by its ID.
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
