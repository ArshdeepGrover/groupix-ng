import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBankAccount } from 'src/app/modules/finasync/models/bank-account.model';
import { ICategory } from 'src/app/modules/finasync/models/category.model';
import {
  ITransaction,
  ETransactionType,
  ETransactionStatus,
  EPaymentMethod,
} from 'src/app/modules/finasync/models/transaction.model';
import { BankAccountsService } from 'src/app/modules/finasync/services/bank-accounts.service';
import { CategoryService } from 'src/app/modules/finasync/services/category.service';
import { TransactionService } from 'src/app/modules/finasync/services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent {
  transactions: ITransaction[] = [];
  bankAccounts: IBankAccount[] = [];
  categories: ICategory[] = [];
  newTransaction: Partial<ITransaction> = {};
  transactionForm!: FormGroup;
  ETransactionStatus = ETransactionStatus;
  EPaymentMethod = EPaymentMethod;
  ETransactionType = ETransactionType;

  constructor(
    private transactionService: TransactionService,
    private bankAccount: BankAccountsService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.transactionForm = this.fb.group({
      amount: ['', Validators.required],
      transaction_type: ['', Validators.required],
      transaction_date: ['', Validators.required],
      status: [ETransactionStatus.COMPLETED, Validators.required],
      reference_number: [''],
      payment_method: ['', Validators.required],
      description: ['', Validators.required],
      category_id: ['', Validators.required],
      bank_account_id: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadTransactions();
    this.loadBankAccounts();
    this.loadCategories();
  }

  loadTransactions() {
    this.transactionService
      .index()
      .subscribe((data) => (this.transactions = data));
  }

  loadBankAccounts() {
    this.bankAccount.miniIndex().subscribe((data) => {
      this.bankAccounts = data;
    });
  }
  loadCategories() {
    this.categoryService.miniIndex().subscribe((data) => {
      this.categories = data;
    });
  }

  addTransaction() {
    this.transactionService.create(this.transactionForm.value).subscribe(() => {
      this.loadTransactions();
      this.newTransaction = {};
    });
  }

  updateTransaction(transaction: ITransaction) {
    this.transactionService
      .update(transaction.id, transaction)
      .subscribe(() => this.loadTransactions());
  }

  deleteTransaction(id: number) {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this transaction?'
    );
    if (isConfirmed) {
      this.transactionService
        .delete(id)
        .subscribe(() => this.loadTransactions());
    }
  }
}
