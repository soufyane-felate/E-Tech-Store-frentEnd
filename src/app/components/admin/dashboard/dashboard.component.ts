import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AdminService]
})
export class DashboardComponent implements OnInit {

  usersCount: number = 0;
  productsCount: number = 0;
  users: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getUsersCount().subscribe(data => {
      this.usersCount = data;
    });

    this.adminService.getProductsCount().subscribe(data => {
      this.productsCount = data;
    });

    this.adminService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

}
