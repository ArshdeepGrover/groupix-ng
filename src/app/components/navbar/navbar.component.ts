import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { SidebarService } from 'src/app/modules/sidebar/services/sidebar.service';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { LoginProviderService } from 'src/app/services/login-provide.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isDarkMode = false;
  user: any;
  currentUrl: string = '';
  showFinaSyncSidebarIcon = false;

  constructor(
    private darkModeService: DarkModeService,
    private loginProviderService: LoginProviderService,
    private router: Router,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.isDarkMode = this.darkModeService.isDarkModeEnabled();
    this.loginProviderService.currentUser$.subscribe((data) => {
      this.user = data;
    });
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
      if (this.currentUrl.includes('/finasync')) {
        this.showFinaSyncSidebarIcon = true;
      } else {
        this.showFinaSyncSidebarIcon = false;
      }
    });
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
    this.isDarkMode = this.darkModeService.isDarkModeEnabled();
  }

  logout() {
    this.loginProviderService.logout();
  }

  toggleFinasyncSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
