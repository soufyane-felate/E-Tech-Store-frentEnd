import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'action'];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.adminService.getProducts().subscribe(products => this.products = products);
  }

  removeProduct(id: number): void {
    const reason = prompt('Please enter the reason for removing this product:');
    if (reason) {
      this.adminService.removeProduct(id, reason).subscribe(() => {
        this.products = this.products.filter(product => product.id !== id);
      });
    }
  }
}
