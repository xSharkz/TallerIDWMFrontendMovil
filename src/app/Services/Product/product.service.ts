import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio encargado de obtener productos disponibles desde la API.
 * Permite consultar los productos filtrados por tipo, orden de clasificación, 
 * número de página y tamaño de página.
 */
@Injectable({
  providedIn: 'root', // Indica que el servicio está disponible a nivel global en la aplicación
})
export class ProductService {
  // URL base para la API de productos disponibles
  private baseUrl = 'http://localhost:5220/api/Product/available';

  /**
   * Constructor que inyecta el servicio HttpClient para realizar peticiones HTTP.
   * 
   * @param http - El servicio HttpClient usado para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene los productos disponibles desde la API.
   * Permite filtrar los productos por tipo, ordenarlos y paginarlos.
   * 
   * @param type - Tipo de producto (ejemplo: "Electrónica", "Ropa").
   * @param sortOrder - Orden de clasificación de los productos (ejemplo: "asc" o "desc").
   * @param pageNumber - Número de la página actual para la paginación.
   * @param pageSize - Cantidad de productos por página (tamaño de la página).
   * @returns Un observable que emite la respuesta de la API con los productos solicitados.
   */
  getAvailableProducts(
    type: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    // Configura los parámetros de la solicitud HTTP con los valores proporcionados
    let params = new HttpParams()
      .set('type', type)            // Parámetro para el tipo de producto
      .set('sortOrder', sortOrder)  // Parámetro para el orden de clasificación
      .set('pageNumber', pageNumber.toString())  // Parámetro para el número de página
      .set('pageSize', pageSize.toString());     // Parámetro para el tamaño de la página

    // Realiza una solicitud GET a la API con los parámetros configurados
    return this.http.get(this.baseUrl, { params });
  }
}
