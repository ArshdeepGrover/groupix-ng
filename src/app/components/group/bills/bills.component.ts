import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BillFormComponent } from 'src/app/components/bill-form/bill-form.component';
import { IBill } from 'src/app/models/bill.model';
import { IGroup } from 'src/app/models/group.model';
import { IPopup } from 'src/app/models/popup.model';
import { IUser } from 'src/app/models/user.model';
import { ToasterService } from 'src/app/modules/toast/toaster.service';
import { BillsService } from 'src/app/services/bills.service';
import { LoginProviderService } from 'src/app/services/login-provide.service';
import { svgIcons } from 'src/app/store/svg.store';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
})
export class BillsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  // group_id!: number;
  group!: IGroup;
  bills!: IBill[];
  currentUser: IUser | null | undefined;
  plusInCircle!: SafeHtml;

  constructor(
    private billService: BillsService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToasterService,
    private loginProviderService: LoginProviderService,
    private sanitizer: DomSanitizer
  ) {
    this.plusInCircle = this.sanitizer.bypassSecurityTrustHtml(
      svgIcons.plus_in_circle
    );
  }

  ngOnInit() {
    this.loginProviderService.currentUser$.subscribe((data) => {
      this.currentUser = data;
    });
    this.activatedRoute.parent?.data.subscribe((res) => {
      this.group = res['group'];
      this.getBills();
    });
  }
  getBills() {
    this.billService.index(this.group.id).subscribe((res) => {
      this.bills = res;
    });
  }

  openBillDialog() {
    const dialogRef = this.dialog.open(BillFormComponent, {
      data: {
        title: 'Add Expense in ' + this.group.name,
        id: this.group.id,
        currentUser: this.currentUser,
        primary_button_text: 'Add Expense',
      },
    });
    dialogRef.afterClosed().subscribe((result: IPopup) => {
      if (result && result.confirm) {
        this.createExpense(
          result.data.id,
          result.data.index,
          result.data.form_value
        );
      }
    });
  }

  createExpense(groupId: number, index: number, formValue: any) {
    this.billService.create(groupId, formValue).subscribe((data) => {
      if (data) {
        this.toastService.showToast(`Expense added!`, 'success');
        this.bills.unshift(data);
      }
    });
  }
}
