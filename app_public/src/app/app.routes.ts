import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NotificationsComponent } from './features/notifications/notifications.component';

/**
 * @title App Routes
 * 
 * This file defines the routes for the application.
 */
export const routes: Routes  = [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
