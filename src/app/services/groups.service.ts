import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTES } from '../apiRoutes/api';
import { IGroup } from '../models/group.model';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GroupsService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  create(data: any): Observable<IGroup> {
    return this.http.post<IGroup>(`${this.apiUrl}/${ROUTES.GROUPS.CREATE}`, {
      group: data,
    });
  }

  index(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(`${this.apiUrl}/${ROUTES.GROUPS.INDEX}`);
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

  show(groupId: number | string): Observable<IGroup> {
    const params = new HttpParams().set('group_id', Number(groupId));
    return this.http.get<IGroup>(`${this.apiUrl}/${ROUTES.GROUPS.SHOW}`, {
      params,
    });
  }

  update(groupId: number, data: any): Observable<IGroup> {
    const params = new HttpParams().set('group_id', groupId);
    return this.http.put<IGroup>(
      `${this.apiUrl}/${ROUTES.GROUPS.UPDATE}`,
      {
        group: data,
      },
      { params }
    );
  }

  createMemberOrAdmin(
    groupId: number,
    userEmail: number,
    memberRoleTypeId: number
  ) {
    const params = new HttpParams().set('group_id', groupId);

    return this.http.post<IGroup>(
      `${this.apiUrl}/${ROUTES.GROUPS.CREATE_MEMBER_ADMIN}`,
      { user_email: userEmail, member_role_type_id: memberRoleTypeId },
      { params }
    );
  }
}
