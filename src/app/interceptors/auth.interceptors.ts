import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class LaLigaAuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = request.headers;
    if (!headers.has('Authorization')) {
      const req = request.clone({
        setHeaders: {
          'X-Auth-Token': `${environment.fbDataKey}`
        }
      });
      return next.handle(req);
    }
    return next.handle(request);
  }
}
