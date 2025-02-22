import { Component, OnInit } from '@angular/core';
import { IBankAccountModel } from 'src/app/models/bank-account.model';
import { BankAccountsService } from 'src/app/services/bank-accounts.service';

@Component({
  selector: 'app-accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: ['./accounts-table.component.scss'],
})
export class AccountsTableComponent implements OnInit {
  bankAccounts!: IBankAccountModel[];

  constructor(private bankAccountService: BankAccountsService) {}

  ngOnInit() {
    this.fetchBankAccounts();
  }

  fetchBankAccounts() {
    this.bankAccountService.index().subscribe((response) => {
      this.bankAccounts = response;
    });
  }
}
