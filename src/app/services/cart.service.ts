import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductDto } from './product-list.service'; // Import ProductDto

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
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>({
    id: 0,
    userEmail: null,
    items: [],
    totalPrice: 0
  });
  public cart$: Observable<Cart> = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  private loadCart(): void {
    this.getCartItems().subscribe({
      next: (cart) => this.cartSubject.next(cart),
      error: () => this.cartSubject.next({
        id: 0, userEmail: null, items: [], totalPrice: 0
      })
    });
  }

  addToCart(productId: string, quantity: number): Observable<Cart> {
    const payload = { productId, quantity };
    return this.http.post<Cart>(`${this.baseUrl}/add`, payload).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  getCartItems(): Observable<Cart> {
    return this.http.get<Cart>(this.baseUrl);
  }

  updateCartItem(productId: string, quantity: number): Observable<void> {
    const payload = { productId: Number(productId), quantity };
    return this.http.put<void>(`${this.baseUrl}/update`, payload);
  }

  removeCartItem(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/item/${productId}`).pipe(
      tap(() => this.loadCart())
    );
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/clear`).pipe(
      tap(() => this.cartSubject.next({
        id: 0, userEmail: null, items: [], totalPrice: 0
      }))
    );
  }
}
