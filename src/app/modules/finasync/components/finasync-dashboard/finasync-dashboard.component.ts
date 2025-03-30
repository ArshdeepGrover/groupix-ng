import { Component, OnInit } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from 'src/app/modules/sidebar/services/sidebar.service';
import { svgIcons } from 'src/app/store/svg.store';

@Component({
  selector: 'app-finasync-dashboard',
  templateUrl: './finasync-dashboard.component.html',
  styleUrls: ['./finasync-dashboard.component.scss'],
})
export class FinasyncDashboardComponent implements OnInit {
  plusIcon!: SafeHtml;
  icons = {
    faChartArea,
  };

  constructor(
    private sanitizer: DomSanitizer,
    private sidebarService: SidebarService
  ) {
    this.plusIcon = this.sanitizer.bypassSecurityTrustHtml(svgIcons.plus);
  }

  ngOnInit() {
    this.sidebarService.openSidebar();
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
