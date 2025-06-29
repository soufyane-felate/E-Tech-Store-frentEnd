import { Component, OnInit } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

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
    MatIconModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './market-place.component.html',
  styleUrl: './market-place.component.css',
})
export class MarketPlaceComponent implements OnInit {
  products: ProductDto[] = [];
  filteredProducts: ProductDto[] = [];
  showAddForm = false;

  imageInputType: 'url' | 'upload' = 'url'; // default
  newProduct: ProductDto = {
    name: '',
    image: '',
    description: '',
    price: 0,
    categorie: '',
    etat: '',
  };

  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(private productService: ProductListService) {}

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
  }

  // 👇 Handle file input and convert to Base64
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.newProduct.image = reader.result as string; // base64 string
      };

      reader.readAsDataURL(file);
    }
  }

  submitProduct() {
    this.productService.addProduct(this.newProduct).subscribe(() => {
      this.loadProducts();
      this.newProduct = {
        name: '',
        image: '',
        description: '',
        price: 0,
        categorie: '',
        etat: '',
      };
      this.imageInputType = 'url';
      this.showAddForm = false;
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

  handleFileInput(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newProduct.image = reader.result as string;
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }
}

