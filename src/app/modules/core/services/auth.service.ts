import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EnvironmenterService } from './environmenter.service';
import { AuthRequest, AuthResponse } from 'src/app/proto/validator/accounts/v2/web_api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private environmenter: EnvironmenterService,
  ) {
  }
  token: string;
  private apiUrl = this.environmenter.env.validatorEndpoint;

  login(password: string): Observable<AuthResponse> {
    return this.authenticate(`${this.apiUrl}/login`, password);
  }

  signup(password: string): Observable<AuthResponse> {
    return this.authenticate(`${this.apiUrl}/signup`, password);
  }

  // Authenticate the user with a password and extract the JWT token
  // from the response object. Uses take to prevent multiple calls to the backend.
  authenticate(method: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(method, { password } as AuthRequest).pipe(
      tap((res: any) => {
        this.token = res.token;
      }),
    );
  }

  // Logout the user and navigate to the application root.
  logout() {
    this.token = '';
    this.router.navigateByUrl('/');
  }
}
