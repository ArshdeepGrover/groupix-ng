import { Component, OnInit } from '@angular/core';
import { faEdit, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IBankAccount } from 'src/app/modules/finasync/models/bank-account.model';
import { BankAccountsService } from 'src/app/modules/finasync/services/bank-accounts.service';
import { ToasterService } from 'src/app/modules/toast/toaster.service';

@Component({
  selector: 'app-accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: ['./accounts-table.component.scss'],
})
export class AccountsTableComponent implements OnInit {
  bankAccounts!: IBankAccount[];
  loading = true;
  icons = {
    faStar,
    faEdit,
    faTrash,
  };

  constructor(
    private bankAccountService: BankAccountsService,
    private toasterService: ToasterService
  ) {}

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
          this.toasterService.showToast('Bank account deleted successfully');
          this.bankAccounts = this.bankAccounts.filter(
            (account) => account.uuid !== uuid
          );
        }
      });
    }
  }
}
