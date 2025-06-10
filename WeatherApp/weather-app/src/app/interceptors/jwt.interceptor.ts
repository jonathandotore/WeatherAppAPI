import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // Obtém o token JWT do AuthService
    const token = this.authService.getToken();

    // Se o token existe, clona a requisição e adiciona o cabeçalho Authorization
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Passa a requisição (original ou clonada com o token) para o próximo manipulador
    return next.handle(request);
  }
}

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
