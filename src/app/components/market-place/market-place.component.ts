import { Component, OnInit } from '@angular/core';
import { ProductDto, ProductListService } from '../../services/product-list.service';
import { AsyncPipe, CommonModule, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-market-place',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgForOf,
    AsyncPipe,
    CurrencyPipe,
    CommonModule,
    RouterLink,
    RouterModule,
    MatIconModule,
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './market-place.component.html',
  styleUrl: './market-place.component.css',
})
export class MarketPlaceComponent implements OnInit {
  products: ProductDto[] = [];

  constructor(private productService: ProductListService) {
    this.productService.getProduct().subscribe((data) => {
      this.products = data;
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}



