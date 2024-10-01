import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalCookieService } from 'src/app/services/local-cookie.service';
import { Router } from '@angular/router';
import {ToasterService} from "../modules/toast/toaster.service";

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
    private router: Router,
    private toastService: ToasterService
  ) {
    this.getLoginFromAuthToken();
  }

  login(email: string, password: string): void {
    this.loginService.login(email, password).subscribe(
      (user) => {
        this.localCookieService.setCookie(user.user_auth_token);
        this.currentUser.next(user);
        this.toastService.showToast(`Welcome back, ${user.name}!`);
        if (user) {
          this.router.navigate(['dashboard']);
        }
      },
      (error) => {
        this.currentUser.next(null);
      }
    );
  }

  signup(dataForm: any){
    this.loginService.signup(dataForm).subscribe((user)=>{
      if(user){
        this.localCookieService.setCookie(user.user_auth_token);
        this.currentUser.next(user);
        this.router.navigate(['dashboard']);
        this.toastService.showToast(`Welcome, ${user.name}!`);
      }
    })
  }

  logout(): void {
    const user = this.currentUser.getValue();
    if (user) {
      this.loginService.logout(user.user_auth_token).subscribe(() => {
        this.toastService.showToast(`Hope to see you again, ${user.name}!`);
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
          this.toastService.showToast(`Welcome back, ${user.name}!`);
        },(error)=>{
          this.localCookieService.removeCookie();
        });
    }
  }
}
