import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/Product/product.service';
import { CartService } from '../Services/Cart/cart.service';
/**
 * Componente para manejar la visualización de productos disponibles
 * y la funcionalidad de agregar productos al carrito de compras.
 * Permite filtrar, ordenar y paginar los productos mostrados.
 */
@Component({
  selector: 'app-tab3',  // El selector del componente para usarlo en las plantillas
  templateUrl: 'tab3.page.html',  // Ruta al archivo de plantilla HTML del componente
  styleUrls: ['tab3.page.scss'],  // Ruta al archivo de estilos SCSS del componente
  standalone: false,  // El componente no es independiente, depende de otros módulos
})
export class Tab3Page implements OnInit {

  products: any[] = [];  // Lista para almacenar los productos disponibles
  selectedType: string = '';  // Filtro por tipo de producto seleccionado
  sortOrder: string = 'asc';  // Orden de clasificación de los productos (ascendente por defecto)
  pageNumber: number = 1;  // Número de página para la paginación (por defecto 1)
  pageSize: number = 10;  // Tamaño de la página para la paginación (por defecto 10 productos por página)
  totalItems: number = 0;  // Total de productos disponibles (usado para determinar si hay más productos)
  /**
   * Constructor del componente.
   * @param productService Servicio para obtener los productos disponibles desde el backend.
   * @param cartService Servicio para manejar el carrito de compras del usuario.
   */
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}
  /**
   * Método que se ejecuta cuando el componente se inicializa.
   * Carga los productos disponibles usando el servicio `productService`.
   */
  ngOnInit() {
    this.getProducts(); // Llama al método para obtener los productos al inicializar el componente
  }
  /**
   * Método para obtener los productos disponibles desde el backend.
   * Aplica los filtros de tipo, orden de clasificación, número de página y tamaño de página.
   * @param event Evento de scroll (opcional), usado para completar la carga de más productos al hacer scroll.
   */
  getProducts(event?: any) {
    this.productService
      .getAvailableProducts(this.selectedType, this.sortOrder, this.pageNumber, this.pageSize)
      .subscribe((response: any) => {
        // Si se pasó un evento (scroll infinito), agrega los nuevos productos a la lista existente
        if (event) {
          this.products = [...this.products, ...response.products];
          event.target.complete(); // Completa el evento de scroll
        } else {
          this.products = response.products; // Si no se pasó evento, reemplaza la lista de productos
        }
        this.totalItems = response.totalItems; // Actualiza el total de productos disponibles
        // Deshabilita el scroll si ya no hay más productos disponibles
        if (this.products.length >= this.totalItems && event) {
          event.target.disabled = true;
        }
      }, (error) => {
        if (event) {
          event.target.complete(); // Completa el evento de scroll en caso de error 
        }
        console.error('Error al obtener productos:', error); // Muestra el error en consola
      });
  }
  /**
   * Método para cargar más productos cuando el usuario hace scroll infinito.
   * Se llama al detectar que el usuario ha llegado al final de la lista de productos.
   * @param event Evento de scroll infinito.
   */
  loadData(event: any) {
    // Si no se han cargado todos los productos, incrementa el número de página y carga más productos
    if (this.products.length < this.totalItems) {
      this.pageNumber++; // Incrementa el número de página
      this.getProducts(event); // Llama al método para cargar más productos
    } else {
      event.target.disabled = true; // Deshabilita el evento de scroll si no hay más productos
    }
  }
  /**
   * Método para agregar un producto al carrito de compras.
   * @param product Producto a agregar al carrito.
   */
  addToCart(product: any) {
    this.cartService.addToCart(product); // Llama al servicio de carrito para agregar el producto
  }

}
