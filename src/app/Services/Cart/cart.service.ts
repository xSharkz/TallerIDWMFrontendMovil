import { Injectable } from '@angular/core';

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
      // Si ya está en el carrito, incrementa la cantidad en 1
      productInCart.quantity += 1;
    } else {
      // Si no está, lo agrega al carrito con cantidad 1
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  /**
   * Devuelve el contenido actual del carrito.
   * 
   * @returns Un arreglo con los productos en el carrito.
   */
  getCart() {
    return this.cart;
  }
}
