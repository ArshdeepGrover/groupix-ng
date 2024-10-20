import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginProviderService } from 'src/app/services/login-provide.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  userSignupForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginProvideService: LoginProviderService
  ) {
    this.userSignupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  signup() {
    this.loginProvideService.signup(this.userSignupForm.value);
  }
}
