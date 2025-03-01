import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { BankAccountsComponent } from './components/bank-accounts/bank-accounts.component';
import { CreditCardsComponent } from './components/credit-cards/credit-cards.component';
import { FinasyncDashboardComponent } from './components/finasync-dashboard/finasync-dashboard.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { FormComponent } from 'src/app/modules/finasync/components/bank-accounts/form/form.component';
import { AccountsTableComponent } from 'src/app/modules/finasync/components/bank-accounts/accounts-table/accounts-table.component';
import { CreditCardListComponent } from 'src/app/modules/finasync/components/credit-cards/credit-card-list/credit-card-list.component';
import { CreditCardFormComponent } from 'src/app/modules/finasync/components/credit-cards/credit-card-form/credit-card-form.component';
import { TransactionComponent } from 'src/app/modules/finasync/components/transaction/transaction.component';

const routes: Routes = [
  {
    path: '',
    component: FinasyncDashboardComponent,
    children: [
      {
        path: 'bank-accounts',
        component: BankAccountsComponent,
        children: [
          {
            path: '',
            component: AccountsTableComponent,
          },
          {
            path: 'new',
            component: FormComponent,
          },
          { path: 'edit/:uuid', component: FormComponent },
        ],
      },
      {
        path: 'transactions',
        component: TransactionComponent,
      },
      {
        path: 'credit-cards',
        component: CreditCardsComponent,
        children: [
          {
            path: '',
            component: CreditCardListComponent,
          },
          {
            path: 'new',
            component: CreditCardFormComponent,
          },
          { path: 'edit/:uuid', component: CreditCardFormComponent },
        ],
      },
      {
        path: 'graphs',
        component: GraphsComponent,
      },
      {
        path: 'subscriptions',
        component: SubscriptionsComponent,
      },
      { path: 'categories', component: CategoriesComponent },
    ],
  },
];

export const FinasyncRoutes = RouterModule.forChild(routes);
