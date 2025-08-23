import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProductDto {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  categorie: string;
  etat: string;
  imageUrl?: string; // إضافة حقل اختياري لرابط الصورة
  useImageUrl?: boolean; // حقل لتحديد نوع الصورة المستخدمة
}

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  private url = 'http://localhost:8080/api/product';

  constructor(private http: HttpClient) {}

  getProduct(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.url}/all`);
  }

  addProduct(product: ProductDto, imageFile?: File): Observable<ProductDto> {
    const formData = new FormData();

    formData.append('product', new Blob([JSON.stringify({
      name: product.name,
      description: product.description,
      price: product.price,
      categorie: product.categorie,
      etat: product.etat,
      imageUrl: product.imageUrl,
      useImageUrl: product.useImageUrl
    })], { type: 'application/json' }));

    if (imageFile) {
      formData.append('imageFile', imageFile, imageFile.name);
    }

    return this.http.post<ProductDto>(`${this.url}/add`, formData);
  }

  getProductById(id: string): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.url}/${id}`);
  }
}
