import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private isOpen = new BehaviorSubject<boolean>(false);
  sidebarState$ = this.isOpen.asObservable();

  toggleSidebar(): void {
    this.isOpen.next(!this.isOpen.value);
  }

  openSidebar(): void {
    this.isOpen.next(true);
  }

  closeSidebar(): void {
    this.isOpen.next(false);
  }
}
