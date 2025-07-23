import { Routes } from '@angular/router';
import { MarketPlaceComponent } from './components/market-place/market-place.component';
import { HomeComponent } from './components/home/home.component';
import { RepairComponent } from './components/repair/repair.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'marketPlace', component: MarketPlaceComponent },
  { path: 'repair', component: RepairComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'products',
    loadComponent: () => import('./components/market-place/market-place.component').then(m => m.MarketPlaceComponent)
  },
  {
    path: 'repair',
    loadComponent: () => import('./components/repair/repair.component').then(m => m.RepairComponent)
  },

  { path: 'home', component: HomeComponent },
];


