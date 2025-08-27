import { Routes } from '@angular/router';
import {DashboardComponent} from "./components/admin/dashboard/dashboard.component";
import {AuthGuard} from "./auth/auth.guard";

export const adminRoutes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
    ]
  }
];
