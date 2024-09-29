import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IGroup } from '../models/group.model';
import { Observable } from 'rxjs';
import { ROUTES } from '../apiRoutes/api';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class GroupMembersService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  index(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(`${this.apiUrl}/${ROUTES.GROUPS.INDEX}`);
  }

  show(groupId: number): Observable<IGroup[]> {
    const params = new HttpParams().set('group_id', groupId);

    return this.http.get<IGroup[]>(`${this.apiUrl}/${ROUTES.GROUPS.INDEX}`, {
      params,
    });
  }

  create(name: string): Observable<IGroup> {
    const params = new HttpParams().set('name', name);
    return this.http.post<IGroup>(`${this.apiUrl}/${ROUTES.GROUPS.CREATE}`, {
      params,
    });
  }

  destroy(groupId: number): Observable<boolean> {
    const params = new HttpParams().set('group_id', groupId);
    return this.http.delete<boolean>(
      `${this.apiUrl}/${ROUTES.GROUPS.DESTROY}`,
      {
        params,
      }
    );
  }
}
