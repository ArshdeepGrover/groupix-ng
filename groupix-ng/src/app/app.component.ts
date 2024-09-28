import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import {ToasterService} from "./modules/toast/toaster.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Groupix';
  isDarkMode = false;

  toasts: { message: string; type: string; duration: number }[] = [];

  constructor(private darkModeService: DarkModeService, private toastService: ToasterService) {
    this.toastService.toastState$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  ngOnInit(): void {
    initFlowbite();
    this.isDarkMode = this.darkModeService.isDarkModeEnabled();
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
    this.isDarkMode = this.darkModeService.isDarkModeEnabled();
  }
}
