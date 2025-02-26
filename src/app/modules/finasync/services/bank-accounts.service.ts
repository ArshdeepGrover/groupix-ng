import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { ROUTES } from 'src/app/apiRoutes/api';

@Injectable({
  providedIn: 'root',
})
export class BankAccountsService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  create(formValues: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/${ROUTES.BANK_ACCOUNTS.CREATE}`,
      {
        bank_account: formValues,
      }
    );
  }

  index(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${ROUTES.BANK_ACCOUNTS.INDEX}`);
  }

  show(uuid: string): Observable<any> {
    const params = new HttpParams().set('uuid', uuid);
    return this.http.get<any>(`${this.apiUrl}/${ROUTES.BANK_ACCOUNTS.SHOW}`, {
      params,
    });
  }

  updateBankAccount(uuid: string, formValues: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${ROUTES.BANK_ACCOUNTS.UPDATE}`, {
      bank_account: formValues,
      uuid: uuid,
    });
  }

  delete(uuid: string): Observable<boolean> {
    const params = new HttpParams().set('uuid', uuid);
    return this.http.delete<boolean>(
      `${this.apiUrl}/${ROUTES.BANK_ACCOUNTS.DESTROY}`,
      {
        params,
      }
    );
  }
}
