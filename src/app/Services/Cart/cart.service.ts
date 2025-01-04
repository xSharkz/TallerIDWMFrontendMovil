import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/**
 * Servicio encargado de gestionar el carrito de compras.
 * Permite añadir productos al carrito y obtener el contenido actual del carrito.
 */
@Injectable({
  providedIn: 'root', // Indica que el servicio es proporcionado a nivel global en la aplicación
})
export class CartService {
  // Lista de productos en el carrito, donde cada producto tiene una propiedad `quantity`
  cart: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]); // Cambiar a BehaviorSubject
  // Exponer el observable del carrito
  cart$ = this.cartSubject.asObservable();

  /**
   * Añade un producto al carrito.
   * Si el producto ya existe en el carrito, incrementa su cantidad.
   * Si no, lo agrega con cantidad 1.
   * 
   * @param product - El producto a agregar al carrito.
   */
  addToCart(product: any) {
    // Verifica si el producto ya está en el carrito
    const productInCart = this.cart.find(item => item.id === product.id);

    if (productInCart) {
      // Si el producto ya está en el carrito, verifica si no se supera el stock
      if (productInCart.quantity < product.stockQuantity) {
        // Si la cantidad no supera el stock, incrementa la cantidad en 1
        productInCart.quantity += 1;
      } else {
        // Si la cantidad supera el stock, no se agrega más
        alert('No puedes agregar más de lo que hay en stock');
      }
    }
    else {
      // Si no está en el carrito, lo agrega con cantidad 1
      this.cart.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next(this.cart); // Emitir el nuevo estado del carrito
  }

  /**
   * Devuelve el contenido actual del carrito.
   * 
   * @returns Un arreglo con los productos en el carrito.
   */
  getCart() {
    return this.cart;
  }
  /**
   * Devuelve el número total de productos en el carrito.
   * 
   * @returns El número total de productos en el carrito.
   */
  getCartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }
}
