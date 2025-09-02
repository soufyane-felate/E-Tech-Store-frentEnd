import { Routes } from '@angular/router';
import {DashboardComponent} from "./components/admin/dashboard/dashboard.component";
import {AuthGuard} from "./auth/auth.guard";
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';

export const adminRoutes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UserListComponent },
      { path: 'products', component: ProductListComponent },
    ]
  }
];
