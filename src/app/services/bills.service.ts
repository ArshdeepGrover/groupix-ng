import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ROUTES } from '../apiRoutes/api';
import { Observable } from 'rxjs';
import { IBill, IBillGraph } from 'src/app/models/bill.model';
import { IBillShare } from 'src/app/models/bill-shared.model';

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
    return this.http.get<IBill[]>(
      `${this.apiUrl}/${ROUTES.BILLS.INDEX}`,
      {
        params,
      }
    );
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

  getSharedBills(groupId: number): Observable<IBillShare[]> {
    const params = new HttpParams().set('group_id', groupId);
    return this.http.get<IBillShare[]>(
      `${this.apiUrl}/${ROUTES.BILLS.SHARE_BILLS}`,
      {
        params,
      }
    );
  }
}
