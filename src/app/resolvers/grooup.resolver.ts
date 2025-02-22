import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GroupsService } from 'src/app/services/groups.service';

@Injectable({
  providedIn: 'root',
})
export class GroupResolver implements Resolve<any> {
  constructor(private groupService: GroupsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const groupId = route.params['id']; // Assumes route includes :groupId
    return this.groupService.show(groupId);
  }
}
