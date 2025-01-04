import { Injectable } from '@angular/core';
import {
  CanActivate, // Interfaz para definir lógica de activación de rutas
  ActivatedRouteSnapshot, // Proporciona información sobre la ruta activa
  RouterStateSnapshot, // Proporciona información sobre el estado del router
  UrlTree, // Representa una URL como árbol
  Router, // Permite la navegación programática
} from '@angular/router';
import { Observable } from 'rxjs'; // Biblioteca para manejar flujos de datos asíncronos
import { AuthService } from '../../Services/Auth/auth.service'; // Servicio para gestionar la autenticación

/**
 * Servicio para proteger rutas en la aplicación.
 * Este guard verifica si un usuario está autenticado antes de permitirle el acceso.
 */
@Injectable({
  providedIn: 'root', // El guard se registra como un servicio singleton en el nivel raíz de la aplicación
})
export class AuthGuard implements CanActivate {
  /**
   * Constructor que inyecta dependencias necesarias para el guard.
   * @param authService Servicio para verificar el estado de autenticación del usuario.
   * @param router Router de Angular para manejar la navegación programática.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Método principal del guard que se ejecuta antes de activar una ruta.
   * Verifica si el usuario está autenticado y decide si puede acceder a la ruta solicitada.
   * 
   * @param route Información sobre la ruta activa.
   * @param state Información sobre el estado actual del router.
   * @returns `true` si el usuario está autenticado, de lo contrario redirige a `/tab1` y devuelve `false`.
   */
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    // Verifica si el usuario está autenticado
    const isAuthenticated = await this.authService.isAuthenticated();
    if (isAuthenticated) {
      return true; // Permite el acceso a la ruta
    } else {
      // Redirige al usuario a una pagina de error si no está autenticado
      this.router.navigate(['/404']);
      return false;
    }
  }
}
