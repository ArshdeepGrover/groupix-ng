import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LocalCookieService} from "../services/local-cookie.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localCookieService: LocalCookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localCookieService.findUserAuthCookie();
    if (token) {
      // Clone the request and add the authorization header if the token exists
      const clonedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(clonedRequest);
    }
    return next.handle(request);
  }
}
