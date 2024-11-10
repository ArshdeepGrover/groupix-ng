import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IData } from 'src/app/models/popup.model';
import { IUser } from 'src/app/models/user.model';
import { LoginProviderService } from 'src/app/services/login-provide.service';
import { buttonsStore } from 'src/app/store/buttons.store';
import { svgIcons } from 'src/app/store/svg.store';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
})
export class GroupFormComponent implements OnInit {
  data: IData = inject(MAT_DIALOG_DATA);
  closeButton!: SafeHtml;
  remove!: SafeHtml;
  plusIcon!: SafeHtml;
  GroupForm: FormGroup;
  currentUser: IUser | null | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GroupFormComponent>,
    private loginProviderService: LoginProviderService
  ) {
    this.GroupForm = this.fb.group({
      name: ['', Validators.required],
      members: this.fb.array([]),
    });
    this.closeButton = this.sanitizer.bypassSecurityTrustHtml(
      buttonsStore.close_button
    );
    this.remove = this.sanitizer.bypassSecurityTrustHtml(svgIcons.user_remove);
    this.plusIcon = this.sanitizer.bypassSecurityTrustHtml(svgIcons.plus);
  }

  // Getter for emails FormArray
  get members(): FormArray {
    return this.GroupForm.get('members') as FormArray;
  }

  ngOnInit() {
    this.loginProviderService.currentUser$.subscribe((data) => {
      this.currentUser = data;
    });
    if (this.data.form_value) {
      this.GroupForm.patchValue({
        name: this.data.form_value.name,
      });
      this.data.form_value.members.forEach((member: any) => {
        this.members.push(
          this.fb.group({
            email: [member.user.email, [Validators.required, Validators.email]],
          })
        );
      });
    } else {
      // this.addEmail();
    }
  }

  // Create a new email FormControl
  createEmail(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email field with validation
    });
  }

  // Add a new email to the emails FormArray
  addEmail(): void {
    this.members.push(this.createEmail());
  }

  // Remove an email from the emails FormArray
  removeEmail(index: number): void {
    this.members.removeAt(index);
  }

  createGroup() {
    this.dialogRef.close({
      confirm: true,
      data: {
        form_value: this.GroupForm.value,
        id: this.data.form_value ? this.data.form_value.id : null,
      },
    });
  }

  close() {
    this.dialogRef.close({ confirm: false });
  }
}
