import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

/**
 * Interceptor de autenticación para agregar el token JWT a las cabeceras de las solicitudes HTTP.
 * Este interceptor verifica si hay un token JWT almacenado en el almacenamiento local
 * y, si lo hay, lo agrega a las cabeceras de la solicitud bajo el encabezado 'Authorization'.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Constructor del interceptor.
   * @param storage Servicio de almacenamiento para recuperar el token JWT.
   */
  constructor(private storage: Storage) {}

  /**
   * Intercepta las solicitudes HTTP y agrega el token JWT a las cabeceras si está disponible.
   *
   * @param request La solicitud HTTP que se va a interceptar.
   * @param next El siguiente manejador de la solicitud HTTP.
   * @returns Un Observable de la solicitud HTTP con las cabeceras modificadas (si el token existe).
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Crear el almacenamiento para acceder a las claves almacenadas
    return from(this.storage.create()).pipe(
      // Obtener el token JWT almacenado
      switchMap(() => {
        return from(this.storage.get('jwt_token')).pipe(
          // Si hay un token JWT, agregarlo a las cabeceras de la solicitud
          switchMap((token: string | null) => {
            if (token) {
              const cloned = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`,
                },
              });
              return next.handle(cloned); // Continuar con la solicitud clonada
            }
            // Si no hay token, continuar con la solicitud original
            return next.handle(request);
          })
        );
      })
    );
  }
}
