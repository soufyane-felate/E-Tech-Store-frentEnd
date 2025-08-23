import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ProductDto,
  ProductListService,
} from '../../services/product-list.service';
import {
  AsyncPipe,
  CommonModule,
  CurrencyPipe,
  NgForOf,
  NgIf,
} from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthService } from "../../auth/auth.service";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-market-place',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgForOf,
    AsyncPipe,
    CurrencyPipe,
    RouterLink,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NavbarComponent,
    NavbarComponent,
    MatCardModule
  ],
  templateUrl: './market-place.component.html',
  styleUrl: './market-place.component.css',
})
export class MarketPlaceComponent implements OnInit {
  products: ProductDto[] = [];
  filteredProducts: ProductDto[] = [];
  showAddForm = false;

  imageInputType: 'url' | 'upload' = 'url';
  newProduct: ProductDto = {
    id: '',
    name: '',
    image: '',
    description: '',
    price: 0,
    categorie: '',
    etat: '',
    imageUrl: '',
    useImageUrl: false
  };
  selectedFile: File | null = null;

  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(private productService: ProductListService, private authService: AuthService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProduct().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  toggleForm() {
    this.showAddForm = !this.showAddForm;
    // إعادة تعيين النموذج عند التبديل
    if (this.showAddForm) {
      this.resetForm();
    }
  }

  resetForm() {
    this.newProduct = {
      id: '',
      name: '',
      image: '',
      description: '',
      price: 0,
      categorie: '',
      etat: '',
      imageUrl: '',
      useImageUrl: false
    };
    this.selectedFile = null;
    this.imageInputType = 'url';
  }

  onImageTypeChange() {
    // إعادة تعيين الحقول عند تغيير نوع الصورة
    if (this.imageInputType === 'url') {
      this.selectedFile = null;
    } else {
      this.newProduct.imageUrl = '';
    }
  }

  handleFileInput(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedFile = fileInput.files[0];
      // عرض معاينة الصورة (اختياري)
      const reader = new FileReader();
      reader.onload = () => {
        this.newProduct.image = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  submitProduct() {
    // تعيين useImageUrl بناءً على نوع الإدخال المحدد
    this.newProduct.useImageUrl = this.imageInputType === 'url';

    let productObservable: Observable<ProductDto>;

    if (this.imageInputType === 'upload' && this.selectedFile) {
      // استخدام تحميل الملف
      productObservable = this.productService.addProduct(this.newProduct, this.selectedFile);
    } else {
      // استخدام رابط URL
      productObservable = this.productService.addProduct(this.newProduct);
    }

    productObservable.subscribe({
      next: () => {
        this.loadProducts();
        this.resetForm();
        this.showAddForm = false;
      },
      error: (error: any) => {
        if (error.status === 403) {
          console.error('Error 403: Forbidden. Check user permissions or token validity.', error);
        } else {
          console.error('Error submitting product:', error);
        }
      }
    });
  }

  filterProduct() {
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory = this.selectedCategory
        ? product.categorie === this.selectedCategory
        : true;

      const matchesSearch = this.searchTerm
        ? product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
        : true;

      return matchesCategory && matchesSearch;
    });
  }

  productDetails(product: ProductDto) {
    console.log('Product details:', product);
  }
}
