import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  currentUser: User | null = null;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: User | null) => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
      this.isAdmin = user?.role === 'ADMIN';
    });
  }

  navItems = [
    { label: 'Home', link: '/home' },
    { label: 'Market Place', link: '/marketPlace' },
    { label: 'Profile', link: '/profile' },
    { label: 'cart', link: '/cart' },
  ];

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.isAdmin = false;
  }
}
