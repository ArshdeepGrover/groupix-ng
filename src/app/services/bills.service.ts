import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ROUTES } from '../apiRoutes/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillsService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  create(groupId: number, formValues: any): Observable<any> {
    const params = new HttpParams().set('group_id', groupId);
    return this.http.post<any>(
      `${this.apiUrl}/${ROUTES.BILLS.CREATE}`,
      { bill: formValues },
      { params }
    );
  }
}
