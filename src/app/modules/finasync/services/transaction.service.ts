import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTES } from 'src/app/apiRoutes/api';
import { ITransaction } from 'src/app/modules/finasync/models/transaction.model';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  create(formValues: any): Observable<ITransaction> {
    return this.http.post<ITransaction>(
      `${this.apiUrl}/${ROUTES.TRANSACTION.CREATE}`,
      {
        transaction: formValues,
      }
    );
  }

  index(): Observable<ITransaction[]> {
    return this.http.get<ITransaction[]>(
      `${this.apiUrl}/${ROUTES.TRANSACTION.INDEX}`
    );
  }

  update(transactionId: number, formValues: any): Observable<ITransaction> {
    return this.http.put<ITransaction>(
      `${this.apiUrl}/${ROUTES.TRANSACTION.UPDATE}`,
      {
        transaction: formValues,
        transaction_id: transactionId,
      }
    );
  }

  delete(transactionId: number): Observable<boolean> {
    const params = new HttpParams().set('transaction_id', transactionId);
    return this.http.delete<boolean>(
      `${this.apiUrl}/${ROUTES.TRANSACTION.DESTROY}`,
      {
        params,
      }
    );
  }
}
