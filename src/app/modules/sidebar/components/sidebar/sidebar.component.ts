import { Component } from '@angular/core';
import { SidebarService } from 'src/app/modules/sidebar/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isOpen$ = this.sidebarService.sidebarState$;

  constructor(private sidebarService: SidebarService) {}

  closeSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
