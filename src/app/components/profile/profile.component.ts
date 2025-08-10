import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log('ProfileComponent: ngOnInit called.');
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('ProfileComponent: currentUser updated:', this.currentUser);
    });
    this.authService.getUserInfo();
    console.log('ProfileComponent: User information retrieved.');
  }
}
