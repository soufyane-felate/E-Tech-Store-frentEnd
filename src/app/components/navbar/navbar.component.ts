import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  navItems = [
    { label: 'Home', link: '/home' },
    { label: 'Market Place', link: '/marketPlace' },
    { label: 'Repair', link: '/repair' },
    { label: 'Products', link: '/products' },
  ];
}
