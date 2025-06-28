import { Routes } from '@angular/router';
import { MarketPlaceComponent } from './components/market-place/market-place.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'marketPlace', component: MarketPlaceComponent },
  {
    path: 'products',
    loadComponent: () => import('./components/market-place/market-place.component').then(m => m.MarketPlaceComponent)
  },

  { path: 'home', component: HomeComponent },
];


