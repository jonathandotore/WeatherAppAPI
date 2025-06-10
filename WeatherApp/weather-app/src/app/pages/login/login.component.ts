import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../../models/login-request';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})

export class LoginComponent {
  loginRequest: LoginRequest = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.errorMessage = '';
    this.authService.login(this.loginRequest).subscribe({
      next: (response) => {        
        console.log('Logado com sucesso:', response.message);
      },
      error: (errorResponse) => {
        console.error('Falha ao efetuar o login:', errorResponse);
        this.errorMessage = errorResponse.message || 'Falha ao efetuar o login. Por favor, cheque suas credenciais e tente novamente.';
      }
    });
  }
}