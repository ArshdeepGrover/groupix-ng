import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'flowbite';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupDialogComponent } from 'src/app/modules/shared-components/delete-popup-dialog/delete-popup-dialog.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { svgIcons } from 'src/app/store/svg.store';
import { ToasterService } from 'src/app/modules/toast/toaster.service';
import { GroupsService } from 'src/app/services/groups.service';
import { IGroup } from 'src/app/models/group.model';
import { buttonsStore } from 'src/app/store/buttons.store';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  GroupForm: FormGroup;
  groups!: IGroup[];
  modalInstance: any;
  plusInCircle!: SafeHtml;
  closeButton!: SafeHtml;
  readonly dialog = inject(MatDialog);

  constructor(
    private fb: FormBuilder,
    private groupService: GroupsService,
    private toastService: ToasterService,
    private sanitizer: DomSanitizer
  ) {
    this.GroupForm = this.fb.group({
      name: ['', Validators.required],
      members: this.fb.array([]),
    });
    this.plusInCircle = this.sanitizer.bypassSecurityTrustHtml(
      svgIcons.plus_in_circle
    );
    this.closeButton = this.sanitizer.bypassSecurityTrustHtml(
      buttonsStore.close_button
    );
  }

  ngOnInit() {
    this.getGroups();
    const modalElement = document.getElementById('crud-modal');
    if (modalElement) {
      const modalOptions = {
        backdrop: false,
        backdropClasses: 'bg-gray-900 bg-opacity-50 fixed inset-0 z-40',
        closable: true,
      };
      // @ts-ignore
      this.modalInstance = new Modal(modalElement, modalOptions);
    }
  }

  // Getter for emails FormArray
  get members(): FormArray {
    return this.GroupForm.get('members') as FormArray;
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

  // Open the modal using the stored instance
  openModal(modelName: any) {
    if (modelName) {
      modelName.show();
    }
    this.addEmail();
  }

  // Close the modal using the stored instance
  closeModal(modelName: any) {
    if (modelName) {
      modelName.hide();
    }
    this.removeEmail(0);
  }

  getGroups() {
    this.groupService.index().subscribe((data) => {
      this.groups = data;
    });
  }

  createGroup() {
    this.groupService.create(this.GroupForm.value).subscribe((data: IGroup) => {
      this.toastService.showToast(`Group: ${data.name} Created!`, 'success');
      this.groups.unshift(data);
      this.closeModal(this.modalInstance);
    });
  }

  deleteGroup(groupId: number, index: number) {
    this.groupService.destroy(groupId).subscribe((data) => {
      if (data) {
        this.toastService.showToast(`Group destroyed!`, 'success');
        this.groups.splice(index, 1);
      }
    });
  }

  openDialog(): void {
    this.dialog.open(DeletePopupDialogComponent);
  }
}
