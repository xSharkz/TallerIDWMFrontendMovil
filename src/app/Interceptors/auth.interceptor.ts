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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: Storage) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.storage.create()).pipe(
      switchMap(() => {
        return from(this.storage.get('jwt_token')).pipe(
          switchMap((token: string | null) => {
            if (token) {
              const cloned = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`,
                },
              });
              return next.handle(cloned);
            }
            return next.handle(request);
          })
        );
      })
    );
  }
}
