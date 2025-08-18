import { Component, OnInit } from '@angular/core';
import { CartService, CartItem, Cart } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCartItems().subscribe({
      next: (data: Cart) => {
        console.log('Cart items:', data);
        this.cartItems = data.items;
        this.totalPrice = data.totalPrice;
      },
      error: (err) => {
        console.error('Error fetching cart items:', err);
      }
    });
  }

  increaseQuantity(item: CartItem): void {
    if (this.updatingItemId !== null) return;

    this.updatingItemId = item.product.id;

    item.quantity += 1;
    this.totalPrice += item.product.price;

    this.cartService.updateCartItem(item.product.id, item.quantity).subscribe({
      next: (data) => {
      },
      error: (err) => {
        console.error('Error updating cart:', err);
        item.quantity -= 1;
        this.totalPrice -= item.product.price;
      },
      complete: () => {
        this.updatingItemId = null;
      }
    });
  }

  decreaseQuantity(item: CartItem): void {
    if (this.updatingItemId !== null || item.quantity <= 1) return;

    this.updatingItemId = item.product.id;

    item.quantity -= 1;
    this.totalPrice -= item.product.price;

    this.cartService.updateCartItem(item.product.id, item.quantity).subscribe({
      next: (data) => {},
      error: (err) => {
        console.error('Error updating cart:', err);
        item.quantity += 1;
        this.totalPrice += item.product.price;
      },
      complete: () => {
        this.updatingItemId = null;
      }
    });
  }


  removeItem(item: CartItem): void {
    this.cartService.removeCartItem(item.product.id).subscribe({
      next: () => {
        this.loadCart();
      },
      error: (err) => {
        console.error('Error removing item from cart:', err);
        console.error('Full error object:', JSON.stringify(err, null, 2));
      }
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.loadCart();
      },
      error: (err) => {
        console.error('Error clearing cart:', err);
      }
    });
  }
}
