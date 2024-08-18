import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

/**
 * @class UserService
 * @description Service that handles user-related operations such as registration and login.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   * @property {string} apiUrl - The base URL for the API endpoints related to user operations.
   */
  private apiUrl = 'http://localhost:3000/api/users';

  /**
   * @constructor
   * @param {HttpClient} http - The Angular HttpClient service used for making HTTP requests to the API.
   */
  constructor(private http: HttpClient) {}

  /**
   * @method register
   * @description Registers a new user by sending their details to the server.
   * @param {User} user - The user object containing the registration details (email and password).
   * @returns {Observable<User>} An observable containing the registered User object.
   */
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  /**
   * @method login
   * @description Logs in a user by sending their credentials to the server and receiving a JWT token.
   * @param {User} user - The user object containing the login credentials (email and password).
   * @returns {Observable<{ token: string }>} An observable containing the JWT token received upon successful login.
   */
  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, user);
  }
}
