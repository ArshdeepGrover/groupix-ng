import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { svgIcons } from 'src/app/store/svg.store';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  undo!: SafeHtml;
  constructor(private sanitizer: DomSanitizer) {
    this.undo = this.sanitizer.bypassSecurityTrustHtml(svgIcons.undo);
  }
}
