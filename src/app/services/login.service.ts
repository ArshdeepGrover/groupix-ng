import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ROUTES } from 'src/app/apiRoutes/api'; // Adjust the path as needed
import { environment } from 'src/environments/environment';
import {IUser} from "../models/user.model";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  login(email: string, password: string): Observable<IUser> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.get<IUser>(`${this.apiUrl}/${ROUTES.USERS.LOGIN}`, {
      params,
    });
  }

  signup(dataForm: any): Observable<IUser>{
    return this.http.post<IUser>(`${this.apiUrl}/${ROUTES.USERS.SIGNUP}`, {user:dataForm});
  }

  logout(token: string): Observable<boolean> {
    const params = new HttpParams().set('token', token);
    return this.http.patch<boolean>(`${this.apiUrl}/${ROUTES.USERS.LOGOUT}`, {
      params,
    });
  }

  getUserInfoFromAuthToken(token: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${ROUTES.USERS.SHOW_FROM_TOKEN}`);
  }
}
