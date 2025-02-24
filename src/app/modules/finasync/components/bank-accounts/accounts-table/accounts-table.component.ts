import { Component, OnInit } from '@angular/core';
import { IBankAccountModel } from 'src/app/modules/finasync/models/bank-account.model';
import { BankAccountsService } from 'src/app/modules/finasync/services/bank-accounts.service';

@Component({
  selector: 'app-accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: ['./accounts-table.component.scss'],
})
export class AccountsTableComponent implements OnInit {
  bankAccounts!: IBankAccountModel[];
  loading = true;

  constructor(private bankAccountService: BankAccountsService) {}

  ngOnInit() {
    this.fetchBankAccounts();
  }

  fetchBankAccounts() {
    this.bankAccountService.index().subscribe((response) => {
      this.bankAccounts = response;
      this.loading = false;
    });
  }

  setPrimary(uuid: string) {}

  deleteBankAccount(uuid: string) {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this bank account?'
    );

    if (isConfirmed) {
      this.bankAccountService.delete(uuid).subscribe((response) => {
        if (response) {
          this.bankAccounts = this.bankAccounts.filter(
            (account) => account.uuid !== uuid
          );
        }
      });
    }
  }
}
