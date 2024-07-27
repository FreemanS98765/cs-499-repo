import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';

export const routes: Routes  = [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
