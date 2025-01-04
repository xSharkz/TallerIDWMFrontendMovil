import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
/**
 * Servicio encargado de la autenticación del usuario.
 * Gestiona el login, almacenamiento de tokens, verificación de autenticación, cierre de sesión y eliminación de cuentas.
 */
@Injectable({
  providedIn: 'root',  // Indica que el servicio está disponible globalmente en la aplicación
})
export class AuthService {
  // URL base para la API de autenticación
  private baseUrl = 'http://localhost:5220/api/Auth';
  /**
   * Constructor que inyecta los servicios HttpClient y Storage.
   * 
   * @param http - El servicio HttpClient usado para realizar solicitudes HTTP.
   * @param storage - El servicio Storage usado para almacenar el token JWT.
   */
  constructor(private http: HttpClient, private storage: Storage) {}
  /**
   * Realiza el login de un usuario, enviando las credenciales al backend y obteniendo un token JWT.
   * 
   * @param credentials - Un objeto con el email y la contraseña del usuario.
   * @returns Una promesa que resuelve con el token JWT.
   */
  login(credentials: { email: string; password: string }) {
    const formData = new FormData();
    formData.append('email', credentials.email); // Agrega el email al formulario
    formData.append('password', credentials.password); // Agrega la contraseña al formulario
    // Realiza una solicitud POST a la API para hacer login y obtener el token
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, formData, {
        withCredentials: true, // Envía las credenciales en las cookies
      })
      .toPromise(); // Retorna una promesa
  }
  /**
   * Verifica si el usuario está autenticado revisando si el token está almacenado.
   * 
   * @returns Una promesa que resuelve con `true` si el usuario está autenticado, `false` si no.
   */
  async isAuthenticated(): Promise<boolean> {
    const token = await this.storage.get('jwt_token'); // Obtiene el token almacenado
    console.log('Token almacenado:', token);
    return !!token; // Devuelve true si el token existe y es válido
  }
  /**
   * Guarda el token JWT en el almacenamiento local del dispositivo.
   * 
   * @param token - El token JWT que se va a guardar.
   */  
  async saveToken(token: string) {
    await this.storage.set('jwt_token', token); // Guarda el token en el almacenamiento
  }
  /**
   * Cierra la sesión del usuario, eliminando el token almacenado y notificando al backend.
   * 
   * @returns Una promesa que resuelve cuando la sesión se haya cerrado correctamente.
   */
  async logout() {
    // Realiza una solicitud POST a la API para cerrar la sesión
    return this.http.post(`${this.baseUrl}/logout`, {}, {
      withCredentials: true,
    }).toPromise()
      .then(() => {
        this.storage.clear(); // Limpia todo el almacenamiento (incluido el token)
        console.log('Sesión cerrada correctamente');
      })
      // Maneja el error en caso de que el token ya no sea válido
      .catch(error => {
        if (error.status === 401) {
          console.warn('El token ya no es válido.');
        }
        this.storage.remove('jwt_token'); // Elimina el token si ocurre un error
      });
  }
  
  /**
   * Elimina la cuenta del usuario en el backend y cierra la sesión.
   * 
   * @returns Una promesa que resuelve cuando la cuenta se haya eliminado correctamente.
   */
  async deleteAccount() {
    // Realiza una solicitud DELETE a la API para eliminar la cuenta
    return this.http.delete(`${this.baseUrl}/delete-account`).toPromise()
      .then(() => {
        this.storage.clear(); // Limpia el almacenamiento (incluido el token)
        console.log('Cuenta eliminada y sesión cerrada');
      })
      .catch((error) => {
        console.error('Error al eliminar la cuenta:', error);
        this.storage.remove('jwt_token'); // Elimina el token en caso de error
      });
  }
  
}
