import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.isAuthenticated().subscribe((authenticated: boolean) => {
      if (!authenticated) { return; }
      this.router.navigate(['/']);
    });
  }

  onSubmitLogin(email: string, password: string): void {
    this.auth.signIn(email, password).subscribe(() => {
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
    });
  }
}
