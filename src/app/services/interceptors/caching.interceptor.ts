import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from "@angular/common/http";
import { RequestCacheService } from "./request-cache.service";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCacheService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const cachedResponse = this.cache.get(req);

    /**
     * If the request is not cachable,
     * the interceptor simply forwards the request to the next handler in the chain.
     * cache-or-fetch
     */

    return cachedResponse
      ? of(cachedResponse)
      : this.sendRequest(req, next, this.cache);
  }

  /**
   * Get server response observable by sending request to `next()`.
   * Will add the response to the cache on the way out.
   */

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCacheService
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        // There may be other events besides the response.
        if (event instanceof HttpResponse) {
          this.cache.put(req, event);
        }
      })
    );
  }
}
