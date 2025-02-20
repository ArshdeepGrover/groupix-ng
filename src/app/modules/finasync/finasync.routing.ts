import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { BankAccountsComponent } from './components/bank-accounts/bank-accounts.component';
import { CreditCardsComponent } from './components/credit-cards/credit-cards.component';
import { FinasyncDashboardComponent } from './components/finasync-dashboard/finasync-dashboard.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';

const routes: Routes = [
  {
    path: '',
    component: FinasyncDashboardComponent,
    children: [
      {
        path: 'bank-accounts',
        component: BankAccountsComponent,
      },
      {
        path: 'credit-cards',
        component: CreditCardsComponent,
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
