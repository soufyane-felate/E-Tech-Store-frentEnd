import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(cart => {
      this.cartItems = cart.items;
      this.totalPrice = cart.totalPrice;
    });
  }

  processPayment(): void {
    // Here you would integrate with a payment gateway (e.g., Stripe, PayPal)
    // For now, we'll just log a message and clear the cart
    console.log('Processing payment for total:', this.totalPrice);
    alert('Payment processed successfully! Your order has been placed.');
    this.cartService.clearCart().subscribe(() => {
      // Optionally navigate to an order confirmation page or home
      // this.router.navigate(['/order-confirmation']);
    });
  }
}
