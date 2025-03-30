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
import { SpinnerComponent } from 'src/app/standalone-components/spinner/spinner.component';
import { CreditCardListComponent } from './components/credit-cards/credit-card-list/credit-card-list.component';
import { CreditCardFormComponent } from 'src/app/modules/finasync/components/credit-cards/credit-card-form/credit-card-form.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { PipesModule } from 'src/app/modules/pipes/pipes.module';
import { SidebarModule } from 'src/app/modules/sidebar/sidebar.module';

@NgModule({
  imports: [
    CommonModule,
    FinasyncRoutes,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    FontAwesomeModule,

    // standalone
    SpinnerComponent,
    PipesModule,
    SidebarModule,
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
    CreditCardListComponent,
    CreditCardFormComponent,
    TransactionComponent,
  ],
})
export class FinasyncModule {}
