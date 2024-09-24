import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalCookieService } from 'src/app/services/local-cookie.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginProviderService {
  private currentUser: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);
  public currentUser$: Observable<IUser | null> =
    this.currentUser.asObservable();

  constructor(
    private loginService: LoginService,
    private localCookieService: LocalCookieService,
    private router: Router
  ) {
    this.getLoginFromAuthToken();
  }

  login(email: string, password: string): void {
    this.loginService.login(email, password).subscribe(
      (user) => {
        this.localCookieService.setCookie(user.user_auth_token);
        this.currentUser.next(user);
        if (user) {
          this.router.navigate(['.']);
        }
      },
      (error) => {
        this.currentUser.next(null);
      }
    );
  }

  logout(): void {
    const user = this.currentUser.getValue();
    if (user) {
      this.loginService.logout(user.user_auth_token).subscribe(() => {
        this.currentUser.next(null);
        this.localCookieService.removeCookie();
        this.router.navigate(['.']);
      });
    }
  }

  getLoginFromAuthToken() {
    const userAuthToken = this.localCookieService.findUserAuthCookie();
    if (userAuthToken) {
      this.loginService
        .getUserInfoFromAuthToken(userAuthToken)
        .subscribe((user) => {
          this.currentUser.next(user);
        });
    }
  }
}
