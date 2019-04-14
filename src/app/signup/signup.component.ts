import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { switchMap } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  successfulSignup = false;
  errorMessage: string;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  onSubmitSignup(value: any) {
    const email = value.email, password = value.password;
    this.submitting = true;

    this.auth.signUp(email, password).pipe(
      switchMap(() => this.auth.signIn(email, password))
    ).subscribe(() => {
      this.successfulSignup = true;
    }, error => {
      console.log(error);
      this.submitting = false;
      this.errorMessage = error.message;
    });
  }
}
