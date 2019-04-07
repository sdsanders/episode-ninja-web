import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, Observable, BehaviorSubject, from } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

// import Amplify, { Auth } from 'aws-amplify';
// import { Auth } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {

  public loggedIn: BehaviorSubject<boolean>;

  constructor(
    private router: Router
  ) {
    Auth.configure(environment.amplify);
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  public signUp(email: string, password: string): Observable<any> {
    return from(Auth.signUp(email, password));
  }

  public confirmSignUp(email: string, code: string): Observable<any> {
    return from(Auth.confirmSignUp(email, code));
  }

  public signIn(email: string, password: string): Observable<any> {
    return from(Auth.signIn(email, password))
      .pipe(
        tap(() => this.loggedIn.next(true))
      );
  }

  public isAuthenticated(): Observable<boolean> {
    return from(Auth.currentAuthenticatedUser())
      .pipe(
        map(result => {
          this.loggedIn.next(true);
          return true;
        }),
        catchError(error => {
          this.loggedIn.next(false);
          return of(false);
        })
      );
  }

  /** signout */
  public signOut() {
    from(Auth.signOut())
      .subscribe(
        result => {
          this.loggedIn.next(false);
          this.router.navigate(['/login']);
        },
        error => console.log(error)
      );
  }

  public currentSession() {
    return from(Auth.currentSession());
  }
}
