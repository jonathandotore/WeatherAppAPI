import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../../models/register-request';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
})

export class RegisterComponent {
  registerRequest: RegisterRequest = { username: '', password: '' };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.registerRequest).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = response.message || 'Registro efetuado com sucesso!';
          
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);

        } else {
          this.errorMessage = response.message || 'Falha ao tentar efetuar o registro. Tente novamente.';
        }
      },
      error: (errorResponse) => {
        console.error('Falha ao tentar registrar:', errorResponse);
        this.errorMessage = errorResponse.message || 'Ocorreu um erro durante sua tentativa de registro.';
      }
    });
  }
}