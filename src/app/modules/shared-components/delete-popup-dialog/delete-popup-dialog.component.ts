import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { buttonsStore } from 'src/app/store/buttons.store';

@Component({
  selector: 'app-delete-popup-dialog',
  templateUrl: './delete-popup-dialog.component.html',
  styleUrls: ['./delete-popup-dialog.component.scss'],
})
export class DeletePopupDialogComponent {
  @Input() title: string = 'Delete';
  @Input() parentType: 'User' | 'Group' | 'Role' = 'Group';
  message: string = `Are you sure you want to delete this ${this.parentType}?`;
  @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  closeButton!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    this.closeButton = this.sanitizer.bypassSecurityTrustHtml(
      buttonsStore.close_button
    );
  }

  confirm() {
    this.onConfirm.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}
