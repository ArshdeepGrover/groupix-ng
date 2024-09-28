import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiResponseInterceptor } from 'src/app/interceptor/api-response.interceptor';
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {ToastModule} from "./modules/toast/toast.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignupComponent,
    DashboardComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiResponseInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
