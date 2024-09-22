import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LocalCookieService {
  constructor(private cookieService: CookieService) {}

  setCookie(token: string) {
    this.cookieService.set(environment.userAuthCookieName, token, {
      expires: 7,
    }); // Set cookie to expire in 7 days
  }

  removeCookie() {
    this.cookieService.delete(environment.userAuthCookieName);
  }

  findUserAuthCookie() {
    return this.cookieService.get(environment.userAuthCookieName);
  }
}
