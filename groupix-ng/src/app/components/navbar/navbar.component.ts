import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
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

  constructor(
    private darkModeService: DarkModeService,
    private loginProviderService: LoginProviderService
  ) {}

  ngOnInit(): void {
    this.isDarkMode = this.darkModeService.isDarkModeEnabled();
    this.loginProviderService.currentUser$.subscribe((data) => {
      this.user = data;
      console.log(
        '🚀 ~ NavbarComponent ~ this.loginProviderService.currentUser$.subscribe ~ this.user:',
        this.user
      );
    });
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
    this.isDarkMode = this.darkModeService.isDarkModeEnabled();
  }

  logout() {
    this.loginProviderService.logout();
  }
}
