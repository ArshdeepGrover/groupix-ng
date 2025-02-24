import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { ROUTES } from 'src/app/apiRoutes/api';
import { ICreditCard } from 'src/app/modules/finasync/models/credit-card.model';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  // ➕ Create a new credit card
  create(formValues: any): Observable<ICreditCard> {
    return this.http.post<ICreditCard>(
      `${this.apiUrl}/${ROUTES.CREDIT_CARDS.CREATE}`,
      {
        credit_card: formValues,
      }
    );
  }

  // 📋 Get all credit cards
  index(): Observable<ICreditCard[]> {
    return this.http.get<ICreditCard[]>(
      `${this.apiUrl}/${ROUTES.CREDIT_CARDS.INDEX}`
    );
  }

  // 🔍 Get specific credit card by UUID
  show(uuidId: string): Observable<any> {
    const params = new HttpParams().set('uuid', uuidId);
    return this.http.get<any>(`${this.apiUrl}/${ROUTES.CREDIT_CARDS.SHOW}`, {
      params,
    });
  }

  // ✏️ Update credit card by UUID
  update(uuidId: string, formValues: any): Observable<ICreditCard> {
    return this.http.put<ICreditCard>(
      `${this.apiUrl}/${ROUTES.CREDIT_CARDS.UPDATE}/${uuidId}`,
      {
        credit_card: formValues,
      }
    );
  }

  // ❌ Delete credit card by UUID
  delete(uuidId: string): Observable<boolean> {
    const params = new HttpParams().set('uuid', uuidId);
    return this.http.delete<boolean>(
      `${this.apiUrl}/${ROUTES.CREDIT_CARDS.DESTROY}`,
      {
        params,
      }
    );
  }

  // ⭐ Set a credit card as primary
  setPrimary(uuidId: string): Observable<boolean> {
    return this.http.patch<boolean>(
      `${this.apiUrl}/${ROUTES.CREDIT_CARDS.SET_PRIMARY}/${uuidId}/set_primary`,
      {}
    );
  }
}
