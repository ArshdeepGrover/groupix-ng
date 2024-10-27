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
import { IPopup } from 'src/app/models/popup.model';
import { GroupFormComponent } from 'src/app/components/group-form/group-form.component';

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
  isLoading = true;
  isCreatingOrUpdatingGroup = false;

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
  }

  openGroupForm() {
    const dialogRef = this.dialog.open(GroupFormComponent, {
      data: {
        title: 'Create Group',
        primary_button_text: 'Create',
      },
    });
    dialogRef.afterClosed().subscribe((result: IPopup) => {
      if (result.confirm) {
        this.isCreatingOrUpdatingGroup = true;
        this.createGroup(result.data.form_value);
      }
    });
  }

  editGroupForm(groupDetails: IGroup) {
    const dialogRef = this.dialog.open(GroupFormComponent, {
      data: {
        title: 'Edit Group',
        form_value: groupDetails,
        primary_button_text: 'Update',
      },
    });
    dialogRef.afterClosed().subscribe((result: IPopup) => {
      if (result.confirm) {
        this.isCreatingOrUpdatingGroup = true;
        this.updateGroup(result.data.id, result.data.form_value);
      }
    });
  }

  getGroups() {
    this.isLoading = true;
    this.groupService.index().subscribe((data) => {
      this.groups = data;
      this.isLoading = false;
    });
  }

  createGroup(formData: any) {
    this.groupService.create(formData).subscribe((data: IGroup) => {
      this.toastService.showToast(`Group: ${data.name} Created!`, 'success');
      this.groups.unshift(data);
      this.isCreatingOrUpdatingGroup = false;
    });
  }

  updateGroup(groupId: number, formData: any) {
    this.groupService.update(groupId, formData).subscribe((data: IGroup) => {
      this.toastService.showToast(`Group: ${data.name} Updates!`, 'success');
      const index = this.groups.findIndex(
        (group: IGroup) => group.id === groupId
      );
      this.groups[index] = data;
      this.isCreatingOrUpdatingGroup = false;
    });
  }

  deleteGroup(groupId: number, index: number) {
    this.groupService.destroy(groupId).subscribe((data) => {
      if (data) {
        this.toastService.showToast(`Group destroyed!`, 'success');
        this.groups.splice(index, 1);
      }
      this.isCreatingOrUpdatingGroup = false;
    });
  }

  openDeleteDialog(group: IGroup, index: number): void {
    const dialogRef = this.dialog.open(DeletePopupDialogComponent, {
      data: {
        title: 'Delete Group',
        message: `Are you sure you want to delete this ${group.name}?`,
        id: group.id,
        index: index,
      },
    });

    dialogRef.afterClosed().subscribe((result: IPopup) => {
      if (result.confirm) {
        this.isCreatingOrUpdatingGroup = true;
        this.deleteGroup(result.data.id, result.data.index);
      }
    });
  }
}
