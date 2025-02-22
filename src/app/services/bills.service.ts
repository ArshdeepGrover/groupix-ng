import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { IBill, IBillGraph } from 'src/app/models/bill.model';
import { IBillShareWithSum } from 'src/app/models/bill-shared.model';
import { ROUTES } from 'src/app/apiRoutes/api';

@Injectable({
  providedIn: 'root',
})
export class BillsService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  create(groupId: number, formValues: any): Observable<IBill> {
    const params = new HttpParams().set('group_id', groupId);
    return this.http.post<IBill>(
      `${this.apiUrl}/${ROUTES.BILLS.CREATE}`,
      { bill: formValues },
      { params }
    );
  }

  index(groupId: number): Observable<IBill[]> {
    const params = new HttpParams().set('group_id', groupId);
    return this.http.get<IBill[]>(`${this.apiUrl}/${ROUTES.BILLS.INDEX}`, {
      params,
    });
  }

  indexForGraph(groupId: number): Observable<IBillGraph[]> {
    const params = new HttpParams().set('group_id', groupId);
    return this.http.get<IBillGraph[]>(
      `${this.apiUrl}/${ROUTES.BILLS.INDEX_GRAPH}`,
      {
        params,
      }
    );
  }

  getSharedBillsWithSum(groupId: number): Observable<IBillShareWithSum> {
    const params = new HttpParams().set('group_id', groupId);
    return this.http.get<IBillShareWithSum>(
      `${this.apiUrl}/${ROUTES.BILLS.SHARE_BILLS}`,
      {
        params,
      }
    );
  }
  getAmountYouOwe(groupId: number): Observable<number> {
    const params = new HttpParams().set('group_id', groupId);
    return this.http.get<number>(
      `${this.apiUrl}/${ROUTES.BILLS.AMOUNT_YOU_OWE}`,
      {
        params,
      }
    );
  }

  getAmountYouLent(groupId: number): Observable<number> {
    const params = new HttpParams().set('group_id', groupId);
    return this.http.get<number>(
      `${this.apiUrl}/${ROUTES.BILLS.AMOUNT_YOU_LENT}`,
      {
        params,
      }
    );
  }
}
