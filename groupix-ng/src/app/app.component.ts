import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { DarkModeService } from 'src/app/services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Groupix';
  isDarkMode = false;

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit(): void {
    initFlowbite();
    this.isDarkMode = this.darkModeService.isDarkModeEnabled();
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
    this.isDarkMode = this.darkModeService.isDarkModeEnabled();
  }
}
