import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }
}
