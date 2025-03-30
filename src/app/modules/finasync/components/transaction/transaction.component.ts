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
  transactionForm!: FormGroup;
  ETransactionStatus = ETransactionStatus;
  EPaymentMethod = EPaymentMethod;
  ETransactionType = ETransactionType;

  currentYear: number = new Date().getFullYear();
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months = [
    { name: 'Jan', value: 1 },
    { name: 'Feb', value: 2 },
    { name: 'Mar', value: 3 },
    { name: 'Apr', value: 4 },
    { name: 'May', value: 5 },
    { name: 'Jun', value: 6 },
    { name: 'Jul', value: 7 },
    { name: 'Aug', value: 8 },
    { name: 'Sep', value: 9 },
    { name: 'Oct', value: 10 },
    { name: 'Nov', value: 11 },
    { name: 'Dec', value: 12 },
  ];

  constructor(
    private transactionService: TransactionService,
    private bankAccount: BankAccountsService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.transactionForm = this.fb.group({
      amount: ['', Validators.required],
      transaction_type: [ETransactionType.CREDIT, Validators.required],
      day: [new Date().getDate(), Validators.required],
      month: [new Date().getMonth() + 1, Validators.required],
      status: [ETransactionStatus.COMPLETED, Validators.required],
      payment_method: [EPaymentMethod.UPI, Validators.required],
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
    const selectedDate = this.getFormattedDate();

    const transactionData = {
      ...this.transactionForm.value,
      transaction_date: selectedDate, // Use formatted date
    };

    this.transactionService.create(transactionData).subscribe(() => {
      this.resetTransactionForm();
    });
  }

  getFormattedDate(): string {
    const { day, month } = this.transactionForm.value;
    return `${this.currentYear}-${String(month).padStart(2, '0')}-${String(
      day
    ).padStart(2, '0')}`;
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

  resetTransactionForm() {
    this.transactionForm.patchValue({
      amount: '',
      transaction_type: ETransactionType.CREDIT,
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      status: ETransactionStatus.COMPLETED,
      payment_method: EPaymentMethod.UPI,
      description: '',
      category_id: '',
      bank_account_id: '',
    });
  }
}
