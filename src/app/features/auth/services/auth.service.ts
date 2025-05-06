import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../models/user.model';
import { SigninResponse } from '../models/signin-response.model';
import { RegisterDto } from '../models/register.dto';
import { RegisterResponse } from '../models/register-response.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private readonly TOKEN_KEY = 'auth_token';
  public authState$ = new BehaviorSubject<{user: User | null}>({user: null});

  constructor(private http: HttpClient, private router: Router) {
    const userData = localStorage.getItem('currentUser');
    console.log('User data in AuthService constructor:', userData);
    if (userData) {
      try {
        const user = JSON.parse(userData);
        console.log('Parsed user:', user);
        this.currentUserSubject.next(user);
        this.authState$.next({user});
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.logout();
      }
    }
  }

  login(email: string, password: string): Observable<SigninResponse> {
    return this.http.post<SigninResponse>(`${environment.apiUrl}/auth/signin`, {
      email,
      password
    }).pipe(
      tap(response => {
        if (response.data) {
          this.setToken(response.data.accessToken);
          console.log('RESPONSE', response);
          localStorage.setItem('currentUser', JSON.stringify(response.data.user));
          this.currentUserSubject.next(response.data.user);
          this.authState$.next({user: response.data.user});
        }
      })
    );
  }

  register(registerDto: RegisterDto): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.apiUrl}/auth/signup`, registerDto);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('layoutType');
    localStorage.removeItem('brandId');
    localStorage.removeItem('brandSubdomain');
    this.currentUserSubject.next(null);
    this.authState$.next({user: null});
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string {
    const user = this.currentUserSubject.value;
    return user?.role || '';
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}