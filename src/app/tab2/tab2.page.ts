import { Component, OnInit } from '@angular/core';
import { OrderService } from '../Services/Order/order.service';
/**
 * Componente para manejar la visualización de las órdenes del usuario.
 * Este componente se encarga de cargar las órdenes desde el backend,
 * mostrar un estado de carga mientras se obtienen los datos y manejar errores
 * en caso de que la carga falle.
 */
@Component({
  selector: 'app-tab2',  // El selector del componente para usarlo en las plantillas
  templateUrl: 'tab2.page.html',  // Ruta al archivo de plantilla HTML del componente
  styleUrls: ['tab2.page.scss'],  // Ruta al archivo de estilos SCSS del componente
  standalone: false,  // El componente no es independiente, depende de otros módulos
})
export class Tab2Page implements OnInit {

  orders: any[] = []; // Lista para almacenar las órdenes del usuario
  loading: boolean = false; // Estado de carga para mostrar un indicador mientras se obtienen las órdenes
  error: string = ''; // Mensaje de error en caso de que falle la carga de las órdenes  
   /**
   * Constructor del componente.
   * @param orderService Servicio para obtener las órdenes del usuario desde el backend.
   */
  constructor(private orderService: OrderService) {}
  /**
   * Método que se ejecuta cuando el componente se inicializa.
   * Carga las órdenes del usuario.
   */
  ngOnInit() {
    // Llama al método para cargar las órdenes al inicializar el componente
    this.loadOrders();
  }
  /**
   * Método para cargar las órdenes del usuario desde el backend.
   * @param pageNumber Número de página para la paginación de las órdenes (por defecto 1).
   * @param pageSize Tamaño de la página (por defecto 10).
   */
  loadOrders(pageNumber: number = 1, pageSize: number = 10) {
    this.loading = true; // Establece el estado de carga a verdadero
    this.error = ''; // Restablece el mensaje de error
    // Llama al servicio para obtener las órdenes
    this.orderService.getUserOrders(pageNumber, pageSize).subscribe(
      (response) => {
        // Si se obtienen órdenes correctamente
        if (response && response.items) {
          // Mapea las órdenes para mostrar solo los datos relevantes
          this.orders = response.items.map((order: any) => ({
            date: order.orderDate, // Fecha de la orden
            totalPrice: order.totalAmount, // Precio total de la orden
            //TODO: Debido a la falta de Mappeo dentro del Backend, no se puede
            //acceder a la información general del producto, por lo que el "type"
            //esta hardcodeado y asi con las demás variables.
            products: order.orderItems.map((item: any) => ({
              name: `${item.productId}`, // ID del producto como nombre (temporal, debido a falta de mapeo del backend)
              type: 'Desconocido', // Tipo de producto (hardcodeado por falta de mapeo)
              unitPrice: item.unitPrice, // Precio unitario del producto
              quantity: item.quantity, // Cantidad de producto
              totalPrice: item.unitPrice * item.quantity, // Precio total del producto (precio unitario * cantidad)
            })),
          }));
        } else {
          // Si no se encuentran órdenes, se muestra un mensaje de error
          this.error = 'No se encontraron órdenes.';
        }
        this.loading = false; // Establece el estado de carga a falso
      },
      (error) => {
        // Si ocurre un error al cargar las órdenes, muestra un mensaje de error
        console.error('Error al cargar las órdenes:', error);
        this.error = 'Error al cargar las órdenes. Intenta de nuevo más tarde.';
        this.loading = false; // Establece el estado de carga a falso
      }
    );
  }
}
