import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeletePopupDialogComponent } from 'src/app/modules/shared-components/delete-popup-dialog/delete-popup-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SpinnerComponent } from 'src/app/modules/shared-components/spinner/spinner.component';
import { UserCardComponent } from 'src/app/modules/shared-components/cards/user-card/user-card.component';

@NgModule({
  declarations: [
    DeletePopupDialogComponent,
    SpinnerComponent,
    UserCardComponent,
  ],
  imports: [CommonModule, MatButtonModule, MatDialogModule],

  exports: [DeletePopupDialogComponent, SpinnerComponent, UserCardComponent],
})
export class SharedComponentsModule {}
