import { Routes } from '@angular/router';
import { MarketPlaceComponent } from './components/market-place/market-place.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import {CartComponent} from "./components/cart/cart.component";
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'marketPlace', component: MarketPlaceComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'product-details/:id', loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent) },
];


