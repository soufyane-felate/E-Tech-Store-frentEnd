import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../auth/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

  getUsersCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/count`);
  }

  getProductsCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/count`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`);
  }

  removeProduct(id: number, reason: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/${id}`, { params: { reason } });
  }
}
