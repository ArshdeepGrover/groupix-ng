import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { buttonsStore } from 'src/app/store/buttons.store';
import { IData } from 'src/app/models/popup.model';
@Component({
  selector: 'app-delete-popup-dialog',
  templateUrl: './delete-popup-dialog.component.html',
  styleUrls: ['./delete-popup-dialog.component.scss'],
})
export class DeletePopupDialogComponent {
  data: IData = inject(MAT_DIALOG_DATA);
  message: string = `Are you sure you want to delete ${this.data?.parentType}?`;
  closeButton!: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<DeletePopupDialogComponent>
  ) {
    this.closeButton = this.sanitizer.bypassSecurityTrustHtml(
      buttonsStore.close_button
    );
  }

  confirm() {
    this.dialogRef.close({ confirm: true, data: this.data });
  }

  cancel() {
    this.dialogRef.close({ confirm: false });
  }
}
