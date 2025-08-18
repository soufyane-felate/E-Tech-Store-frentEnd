import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDto, ProductListService } from '../services/product-list.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from '../services/cart.service';

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
    private cartService: CartService,
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

  // addToCart(): void {
  //   if (this.product) {
  //     this.cartService.addToCart(this.product.id, 1).subscribe({
  //       next: () => {
  //         console.log('Product added to cart successfully');
  //       },
  //       error: (error) => {
  //         console.error('Error adding product to cart:', error);
  //       }
  //     });
  //   }
  // }
  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product.id, 1).subscribe({
        next: () => {
          alert('Product added to cart');
        },
        error: (err) => {
          console.error('Error adding to cart:', err);
          alert('Failed to add product to cart.');
        }
      });

    }
  }

  goBack(): void {
    this.router.navigate(['/marketPlace']);
  }
}


