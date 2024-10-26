import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeletePopupDialogComponent } from 'src/app/modules/shared-components/delete-popup-dialog/delete-popup-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [DeletePopupDialogComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],

  exports: [DeletePopupDialogComponent],
})
export class SharedComponentsModule {}
