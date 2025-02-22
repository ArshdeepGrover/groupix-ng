import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GroupFormComponent } from 'src/app/components/group-form/group-form.component';
import { IData } from 'src/app/models/popup.model';
import { buttonsStore } from 'src/app/store/buttons.store';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss'],
})
export class BillFormComponent implements OnInit {
  data: IData = inject(MAT_DIALOG_DATA);
  closeButton!: SafeHtml;
  billForm: FormGroup;
  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GroupFormComponent>
  ) {
    this.billForm = this.fb.group({
      description: ['', Validators.required],
      amount: [0, Validators.required],
      date: [],
      currency_type: ['INR', Validators.required],
      divide_equally: [true, Validators.required],
      payer_id: [this.data.currentUser.id, Validators.required],
    });
    this.closeButton = this.sanitizer.bypassSecurityTrustHtml(
      buttonsStore.close_button
    );
  }

  ngOnInit() {
    const todayDateTime = new Date();

    // Convert to local time in the format 'YYYY-MM-DDTHH:mm'
    const localDateTime = new Date(
      todayDateTime.getTime() - todayDateTime.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16);

    this.billForm.patchValue({
      date: localDateTime,
    });
  }

  createExpense() {
    this.dialogRef.close({
      confirm: true,
      data: {
        form_value: this.billForm.value,
        id: this.data.id,
      },
    });
  }

  close() {
    this.dialogRef.close({ confirm: false });
  }
}
