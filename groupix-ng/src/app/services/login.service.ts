import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ROUTES } from 'src/app/apiRoutes/api'; // Adjust the path as needed
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.get<any>(`${this.apiUrl}/${ROUTES.USER.LOGIN}`, {
      params,
    });
  }

  logout(token: string): Observable<boolean> {
    const params = new HttpParams().set('token', token);
    return this.http.patch<boolean>(`${this.apiUrl}/${ROUTES.USER.LOGOUT}`, {
      params,
    });
  }

  getUserInfoFromAuthToken(token: string): Observable<any> {
    const params = new HttpParams().set('token', token);
    return this.http.get<any>(`${this.apiUrl}/${ROUTES.USER.SHOW_FROM_TOKEN}`, {
      params,
    });
  }
}
