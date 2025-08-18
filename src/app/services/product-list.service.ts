import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface ProductDto {
  id: string;
  name: String;
  image: String;
  description: String;
  price: number;
  categorie: String;
  etat: String;
}

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  private url = 'http://localhost:8080/api/product';

  constructor(private http: HttpClient) {}

  getProduct(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(this.url);
  }

  addProduct(product: ProductDto): Observable<ProductDto> {
    return this.http.post<ProductDto>(this.url, product);
  }

  getProductById(id: string): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.url}/${id}`);
  }
}
