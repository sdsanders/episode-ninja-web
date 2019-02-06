import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable <HttpEvent<any>> {

    return this.authService.currentSession()
    .pipe(
      mergeMap((session) => {
        const token = session.getAccessToken();

        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token.getJwtToken()}`
          }
        });
        return next.handle(request);
      }),
      catchError(() => next.handle(request))
    );
  }
}
