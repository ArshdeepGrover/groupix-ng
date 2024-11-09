import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { LoginProviderService } from 'src/app/services/login-provide.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  user: IUser | null | undefined;
  isLoading: boolean = false;
  constructor(
    private loginProviderService: LoginProviderService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.loginProviderService.currentUser$.subscribe((data) => {
      this.user = data;
      if (data) {
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['dashboard']);
        }, 1000);
      }
    });
  }

  login() {
    this.loginProviderService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }
}
