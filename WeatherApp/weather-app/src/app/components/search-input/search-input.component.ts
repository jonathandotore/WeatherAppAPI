import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchCityService } from '../../shared/search-city.service';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-input.component.html',
})

export class SearchInputComponent {
  searchControl = new FormControl('', [ Validators.pattern(/^[a-zA-Z\s]*$/) ]);
cidadesfavoritas: any;

  constructor(private searchCityService: SearchCityService) {}

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
}
