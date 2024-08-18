import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';

/**
 * @class NotificationService
 * @description Service that provides methods to interact with the notifications API, including fetching, adding, deleting, and toggling notifications.
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  /**
   * @property {string} apiUrl - The base URL for the API endpoints related to notifications.
   */
  private apiUrl = 'http://localhost:3000/api/notifications';

  /**
   * @constructor
   * @param {HttpClient} http - The Angular HttpClient service used for making HTTP requests to the API.
   */
  constructor(private http: HttpClient) {}

  /**
   * @method getNotifications
   * @description Retrieves all notifications from the server.
   * @returns {Observable<Notification[]>} An observable containing an array of Notification objects.
   */
  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl);
  }

  /**
   * @method addNotification
   * @description Sends a request to add a new notification to the server.
   * @param {Notification} notification - The notification object to be added.
   * @returns {Observable<Notification>} An observable containing the newly added Notification object.
   */
  addNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, notification);
  }

  /**
   * @method deleteNotification
   * @description Sends a request to delete a notification by its ID.
   * @param {string} id - The ID of the notification to be deleted.
   * @returns {Observable<void>} An observable that completes when the deletion is successful.
   */
  deleteNotification(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * @method toggleNotifications
   * @description Toggles the notification settings for a specific user.
   * @param {string} userId - The ID of the user whose notification settings are being toggled.
   * @param {boolean} notificationsEnabled - The new state of the user's notification settings (true for enabled, false for disabled).
   * @returns {Observable<any>} An observable containing the response from the server.
   */
  toggleNotifications(
    userId: string,
    notificationsEnabled: boolean
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/toggle-notifications`, {
      userId,
      notificationsEnabled,
    });
  }
}