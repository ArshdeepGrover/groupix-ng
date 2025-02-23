import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinasyncRoutes } from 'src/app/modules/finasync/finasync.routing';
import { FinasyncDashboardComponent } from './components/finasync-dashboard/finasync-dashboard.component';
import { BankAccountsComponent } from './components/bank-accounts/bank-accounts.component';
import { CreditCardsComponent } from './components/credit-cards/credit-cards.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/bank-accounts/form/form.component';
import { AccountsTableComponent } from './components/bank-accounts/accounts-table/accounts-table.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FinasyncRoutes,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    FontAwesomeModule,
  ],
  declarations: [
    FinasyncDashboardComponent,
    BankAccountsComponent,
    CreditCardsComponent,
    GraphsComponent,
    SubscriptionsComponent,
    CategoriesComponent,
    FormComponent,
    AccountsTableComponent,
  ],
})
export class FinasyncModule {}
