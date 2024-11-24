import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { HomepageComponent } from 'src/app/components/homepage/homepage.component';
import { GroupComponent } from 'src/app/components/group/group.component';
import { GroupDashboardComponent } from 'src/app/components/group/group-dashboard/group-dashboard.component';
import { EditGroupComponent } from 'src/app/components/group/edit-group/edit-group.component';
import { BillsComponent } from 'src/app/components/group/bills/bills.component';
import { GroupMembersComponent } from 'src/app/components/group/group-members/group-members.component';
import { GroupResolver } from 'src/app/resolvers/grooup.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'group/:id',
    component: GroupComponent,
    resolve:{group: GroupResolver},
    children: [
      {
        path: '',
        component: GroupDashboardComponent,
      },
      {
        path: 'edit',
        component: EditGroupComponent,
      },
      {
        path: 'bills',
        component: BillsComponent,
      },
      {
        path: 'members',
        component: GroupMembersComponent,
      },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  {
    path: '**', // Wildcard route
    redirectTo: '404', // Redirect to the dashboard if no route is found
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
