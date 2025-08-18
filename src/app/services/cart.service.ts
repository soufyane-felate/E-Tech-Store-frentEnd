import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDto } from './product-list.service';

export interface CartItem {
  product: ProductDto;
  quantity: number;
}

export interface Cart {
  id: number;
  userEmail: string | null;
  totalPrice: number;
  items: CartItem[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080/api/v1/cart';

  constructor(private http: HttpClient) {}

  addToCart(productId: string, quantity: number): Observable<any> {
    const payload = { productId, quantity };
    return this.http.post(`${this.baseUrl}/add`, payload);
  }

  getCartItems(): Observable<Cart> {
    return this.http.get<Cart>(this.baseUrl);
  }

  updateCartItem(productId: string, quantity: number): Observable<any> {
    const payload = { productId, quantity };
    return this.http.put(`${this.baseUrl}/update`, payload);
  }

  removeCartItem(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/item/${productId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/clear`);
  }
}
