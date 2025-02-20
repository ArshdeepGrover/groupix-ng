import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinasyncRoutes } from 'src/app/modules/finasync/finasync.routing';
import { FinasyncDashboardComponent } from './components/finasync-dashboard/finasync-dashboard.component';
import { BankAccountsComponent } from './components/bank-accounts/bank-accounts.component';
import { CreditCardsComponent } from './components/credit-cards/credit-cards.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { CategoriesComponent } from './components/categories/categories.component';

@NgModule({
  imports: [CommonModule, FinasyncRoutes],
  declarations: [
    FinasyncDashboardComponent,
    BankAccountsComponent,
    CreditCardsComponent,
    GraphsComponent,
    SubscriptionsComponent,
    CategoriesComponent,
  ],
})
export class FinasyncModule {}
