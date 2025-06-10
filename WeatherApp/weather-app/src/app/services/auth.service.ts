import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { AuthResponse } from '../../models/auth-response';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login-request';
import { RegisterRequest } from '../../models/register-request';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:5198/api/Auth';
  private currentUserSubject!: BehaviorSubject<AuthResponse | null>;
  public currentUser!: Observable<AuthResponse | null>;


  constructor(private http: HttpClient, private router: Router) {
    const storedToken = localStorage.getItem('jwt_token');
    const storedUsername = localStorage.getItem('username');
    let initialUser: AuthResponse | null = null;

    if (storedToken && storedUsername)
      initialUser = { token: storedToken, username: storedUsername, message: "Autenticado", success: true }

    this.currentUserSubject = new BehaviorSubject<AuthResponse | null>(initialUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  isLogged(): boolean {
    return this.currentUserSubject.value != null && !!this.currentUserSubject.value.token;
  }

  getToken(): string | null {
    return this.currentUserSubject.value?.token || null;
  }

  // Chamada de login para o backend
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.success && response.token) {
            localStorage.setItem('jwt_token', response.token);
            localStorage.setItem('username', response.username);
            this.currentUserSubject.next(response); // Notifica os subscribers
            this.router.navigate(['/']); // Redireciona para a home
          }
        }),
        catchError(this.handleError<AuthResponse>('login'))
      );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);

      const authResponse: AuthResponse = {
        token: '',
        username: '',
        message: error.error?.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde.', // Melhor mensagem
        success: false
      };
      return throwError(() => authResponse);
    };
  }

  // Chamada de registro para o backend
  register(credentials: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, credentials)
      .pipe(
        catchError(this.handleError<AuthResponse>('register'))
      );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('username');
    this.currentUserSubject.next(null); 
    this.router.navigate(['/']);
  }
}
