import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio encargado de obtener las órdenes de un usuario desde la API.
 * Permite consultar las órdenes de un usuario con paginación.
 */
@Injectable({
  providedIn: 'root', // Indica que el servicio estará disponible globalmente en la aplicación
})
export class OrderService {

  // URL base para la API de órdenes
  private baseUrl = 'http://localhost:5220/api/Order';

  /**
   * Constructor que inyecta el servicio HttpClient para realizar solicitudes HTTP.
   * 
   * @param http - El servicio HttpClient usado para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene las órdenes de un usuario desde la API.
   * Permite la paginación de las órdenes a través de los parámetros `pageNumber` y `pageSize`.
   * 
   * @param pageNumber - Número de la página actual (por defecto es 1).
   * @param pageSize - Número de órdenes por página (por defecto es 10).
   * @returns Un observable que emite la respuesta de la API con las órdenes solicitadas.
   */
  getUserOrders(pageNumber: number = 1, pageSize: number = 10): Observable<any> {
    // Configura los parámetros de la solicitud HTTP con los valores de la página y tamaño
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString()) // Parámetro para el número de página
      .set('pageSize', pageSize.toString());   // Parámetro para el tamaño de la página

    // Realiza una solicitud GET a la API para obtener las órdenes
    return this.http.get<any>(`${this.baseUrl}/orders`, { params });
  }
}
