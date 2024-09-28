import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ROUTES} from "../apiRoutes/api";
import { IGroup } from '../models/group';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupsService extends BaseService{

  constructor(private http: HttpClient) { super();}


  create(data:any) :Observable<IGroup>{
    return this.http.post<IGroup>(`${this.apiUrl}/${ROUTES.GROUPS.CREATE}`,
      data,
    );
  }


  index() :Observable<IGroup[]>{
    return this.http.get<IGroup[]>(`${this.apiUrl}/${ROUTES.GROUPS.INDEX}`);
  }
}
