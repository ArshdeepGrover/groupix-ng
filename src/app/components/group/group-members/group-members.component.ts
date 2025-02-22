import {
  Component,
  ElementRef,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IGroup } from 'src/app/models/group.model';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.scss'],
})
export class GroupMembersComponent implements OnInit {
  group!: IGroup;
  isLoading = true;
  userEmailForm: FormGroup;
  readonly dialog = inject(MatDialog);

  @ViewChild('addMember', { static: true }) addMember!: TemplateRef<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private groupService: GroupsService,
    private fb: FormBuilder
  ) {
    this.userEmailForm = this.fb.group({
      user_email: ['', Validators.required],
      member_role_type_id: [3, Validators.required],
    });
  }

  ngOnInit() {
    this.activatedRoute.parent?.data.subscribe((res) => {
      this.group = res['group'];
      this.isLoading = false;
    });
  }

  addMemberPopup() {
    this.dialog.open(this.addMember, {
      width: '400px', // Set the width of the dialog
    });
  }

  addMemberAdmin() {
    const userEmailControl = this.userEmailForm.get('user_email');
    const memberRoleTypeControl = this.userEmailForm.get('member_role_type_id');

    if (userEmailControl && memberRoleTypeControl) {
      this.groupService
        .createMemberOrAdmin(
          this.group.id,
          userEmailControl.value,
          memberRoleTypeControl.value
        )
        .subscribe((res) => {
          this.group = res;
        });
    } else {
      console.error('Form controls are missing or invalid.');
    }
  }
}
