import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  updatingItemId: string | null = null;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.cartItems = data.items;
        this.calculateTotalPrice();
      },
      error: (err) => console.error('Error fetching cart items:', err)
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  increaseQuantity(item: CartItem): void {
    if (this.updatingItemId) return;

    this.updatingItemId = item.product.id;
    const newQuantity = item.quantity + 1;

    this.cartService.updateCartItem(item.product.id, newQuantity).subscribe({
      next: () => {
        item.quantity = newQuantity;
        this.calculateTotalPrice();
      },
      error: (err) => console.error('Error updating cart:', err),
      complete: () => this.updatingItemId = null
    });
  }

  decreaseQuantity(item: CartItem): void {
    if (this.updatingItemId || item.quantity <= 1) return;

    this.updatingItemId = item.product.id;
    const newQuantity = item.quantity - 1;

    this.cartService.updateCartItem(item.product.id, newQuantity).subscribe({
      next: () => {
        item.quantity = newQuantity;
        this.calculateTotalPrice();
      },
      error: (err) => console.error('Error updating cart:', err),
      complete: () => this.updatingItemId = null
    });
  }

  removeItem(item: CartItem): void {
    this.cartService.removeCartItem(item.product.id).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Error removing item from cart:', err)
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Error clearing cart:', err)
    });
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
