import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUserId(): string {
    // Return the logged-in user's ID from localStorage
    return localStorage.getItem('userId') || '';
  }

  getNotificationsState(): boolean {
    // Return the user's notification state from localStorage
    return localStorage.getItem('notificationsEnabled') === 'true';
  }

  setNotificationsState(state: boolean): void {
    // Set the user's notification state in localStorage
    localStorage.setItem('notificationsEnabled', state.toString());
  }

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

  logout(): void {
    // Clear the user ID and notification state from local storage on logout
    localStorage.removeItem('userId');
    localStorage.removeItem('notificationsEnabled');
  }

  register(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/register`, body);
  }
}
