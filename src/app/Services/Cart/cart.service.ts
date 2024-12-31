import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: any[] = [];

  addToCart(product: any) {
    const productInCart = this.cart.find(item => item.id === product.id);
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  getCart() {
    return this.cart;
  }
}
