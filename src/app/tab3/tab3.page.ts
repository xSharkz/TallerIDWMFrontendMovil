import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/Product/product.service';
import { CartService } from '../Services/Cart/cart.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {

  products: any[] = [];
  selectedType: string = '';
  sortOrder: string = 'asc';
  pageNumber: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts(event?: any) {
    this.productService
      .getAvailableProducts(this.selectedType, this.sortOrder, this.pageNumber, this.pageSize)
      .subscribe((response: any) => {
        if (event) {
          this.products = [...this.products, ...response.products];
          event.target.complete();
        } else {
          this.products = response.products;
        }
        this.totalItems = response.totalItems;

        if (this.products.length >= this.totalItems && event) {
          event.target.disabled = true;
        }
      }, (error) => {
        if (event) {
          event.target.complete(); 
        }
        console.error('Error al obtener productos:', error);
      });
  }

  loadData(event: any) {
    if (this.products.length < this.totalItems) {
      this.pageNumber++;
      this.getProducts(event);
    } else {
      event.target.disabled = true;
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

}
