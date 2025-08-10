import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDto, ProductListService } from '../services/product-list.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: ProductDto | undefined;
  productFound: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProductById(productId).subscribe({
          next: (data: ProductDto) => {
            this.product = data;
            this.productFound = true;
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error fetching product details:', error);
            this.productFound = false;
          }
        });
      } else {
        this.productFound = false;
      }
    });
  }

  addToCart(): void {
    console.log('Add to cart clicked for product:', this.product?.name);
  }

  goBack(): void {
    this.router.navigate(['/marketPlace']);
  }
}

