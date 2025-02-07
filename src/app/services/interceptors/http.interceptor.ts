import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class _httpInterceptor implements HttpInterceptor {
  constructor() {}
  apiUrl = environment.url;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('accesstoken');
    let urls = [this.apiUrl + 'auth/'];
    if (urls.includes(request.url)) {
      request = request.clone({
        headers: request.headers.set('authorization', `Bearer ${token}`),
      });
    } else {
      request = request.clone({
        headers: new HttpHeaders({
          // 'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        }),
      });
    }

    return next.handle(request);
  }
}
