import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchCityService } from '../../shared/search-city.service';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-input.component.html',
})

export class SearchInputComponent {
  searchControl = new FormControl('', [ Validators.pattern(/^[a-zA-Z\s]*$/) ]);
  cidadesfavoritas: any;
  isAuthenticated: boolean = false;
  username!: string 
  private authSubscription!: Subscription;
  router: any;


  constructor(private searchCityService: SearchCityService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.isAuthenticated = user != null && user.success;
      this.username = user?.username || '';
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onSearch(): void {
    if (this.searchControl.valid) {
      const city = this.searchControl.value ? (this.searchControl.value as string).trim() : '';
      if (city) {
        this.searchCityService.setCity(city);
        console.log('Cidade pesquisada:', city);
      }
    }
    else {
      console.warn('Entrada inválida: Apenas texto é permitido.');
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']); 
  }
}
