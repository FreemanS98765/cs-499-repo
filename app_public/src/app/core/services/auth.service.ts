import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * @class AuthService
 * @description Service that handles all authentication-related tasks, including user login, logout, registration, and managing user states.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * @property {string} apiUrl - The base URL for the API endpoints related to user authentication.
   */
  private apiUrl = 'http://localhost:3000/api/users';

  /**
   * @constructor
   * @param {HttpClient} http - The Angular HttpClient service used for making HTTP requests to the API.
   */
  constructor(private http: HttpClient) {}

  /**
   * @method getUserId
   * @description Retrieves the logged-in user's ID from localStorage.
   * @returns {string} The user's ID or an empty string if not found.
   */
  getUserId(): string {
    // Return the logged-in user's ID from localStorage
    return localStorage.getItem('userId') || '';
  }

  /**
   * @method getNotificationsState
   * @description Retrieves the user's notification state from localStorage.
   * @returns {boolean} The notification state (true if enabled, false otherwise).
   */
  getNotificationsState(): boolean {
    // Return the user's notification state from localStorage
    return localStorage.getItem('notificationsEnabled') === 'true';
  }

  /**
   * @method setNotificationsState
   * @description Sets the user's notification state in localStorage.
   * @param {boolean} state - The new notification state to be saved.
   */
  setNotificationsState(state: boolean): void {
    // Set the user's notification state in localStorage
    localStorage.setItem('notificationsEnabled', state.toString());
  }

  /**
   * @method login
   * @description Handles the user login process by sending credentials to the API and storing the user's ID and notification state in localStorage upon successful login.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Observable<any>} An observable containing the API response, typically the JWT token and user information.
   */
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      tap((response: any) => {
        // Store the user ID in local storage upon successful login
        localStorage.setItem('userId', response.userId);
        localStorage.setItem(
          'notificationsEnabled',
          response.notificationsEnabled
        );
      })
    );
  }

  /**
   * @method logout
   * @description Logs the user out by clearing the user's ID and notification state from localStorage.
   */
  logout(): void {
    // Clear the user ID and notification state from local storage on logout
    localStorage.removeItem('userId');
    localStorage.removeItem('notificationsEnabled');
  }

  /**
   * @method register
   * @description Handles user registration by sending the new user's details to the API.
   * @param {string} email - The email address of the new user.
   * @param {string} password - The password for the new user.
   * @returns {Observable<any>} An observable containing the API response, typically a success message or error.
   */
  register(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/register`, body);
  }
}