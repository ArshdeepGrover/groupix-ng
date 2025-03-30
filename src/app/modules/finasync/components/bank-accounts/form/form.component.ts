import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EBankAccountType } from 'src/app/modules/finasync/models/bank-account.model';
import { IUser } from 'src/app/models/user.model';
import { ToasterService } from 'src/app/modules/toast/toaster.service';
import { BankAccountsService } from 'src/app/modules/finasync/services/bank-accounts.service';
import { LoginProviderService } from 'src/app/services/login-provide.service';
import { bank_names } from 'src/app/modules/finasync/stores/bank-names-list.store';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  currentUser: IUser | null = null;
  uuid!: string;
  EBankAccountType = EBankAccountType;
  bankNames = bank_names;
  bankAccountForm = this.fb.group({
    account_holder_name: ['', Validators.required],
    account_nickname: ['', Validators.required],
    account_number: ['', Validators.required],
    account_type: [EBankAccountType.SAVINGS, Validators.required],
    bank_name: ['', Validators.required],
    ifsc_code: ['', Validators.required],
    is_primary: [true, Validators.required],
    balance: [0, Validators.required],
    note: [''],
  });

  constructor(
    private bankAccountService: BankAccountsService,
    private fb: FormBuilder,
    private loginProviderService: LoginProviderService,
    private toastService: ToasterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getParams();
    this.fetchCurrentUser();
  }

  getParams() {
    this.activatedRoute.params.subscribe((params) => {
      this.uuid = params['uuid'];
      if (this.uuid) {
        this.fetchBankAccount();
      }
    });
  }

  fetchCurrentUser() {
    this.loginProviderService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      if (this.currentUser) {
        this.bankAccountForm.patchValue({
          account_holder_name: this.currentUser.name,
        });
      }
    });
  }

  createBankAccount() {
    this.bankAccountService
      .create(this.bankAccountForm.value)
      .subscribe((response) => {
        if (response) {
          this.toastService.showToast(
            'Bank Account Created Successfully',
            'success'
          );
          this.router.navigate(['/finasync/bank-accounts']);
          this.bankAccountForm.reset();
        }
      });
  }

  fetchBankAccount() {
    this.bankAccountService
      .show(this.uuid)
      .subscribe((response) => this.bankAccountForm.patchValue(response));
  }

  updateBankDetails() {
    this.bankAccountService
      .updateBankAccount(this.uuid, this.bankAccountForm.value)
      .subscribe((response) => {
        if (response) {
          this.toastService.showToast(
            'Bank Account Updated Successfully',
            'success'
          );
          this.router.navigate(['/finasync/bank-accounts']);
        }
      });
  }
}
