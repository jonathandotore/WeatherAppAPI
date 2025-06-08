import { Component, OnInit, OnDestroy } from '@angular/core';
import { FiveDaysWeatherDto } from '../../../models/five-days-weather-dto';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { SearchCityService } from '../../shared/search-city.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-five-days-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './five-days-weather.component.html',
})

export class FiveDaysWeatherComponent implements OnInit, OnDestroy {

  forecast: FiveDaysWeatherDto[] = [];
  city: string = 'São José do Rio Preto';
  lastSuccessfulCity: string = 'São José do Rio Preto';
  loading: boolean = false;
  error: string = '';

  private citySubscription!: Subscription;
  private apiCallSubscription: Subscription | null = null;
  
  constructor(
    private weatherService: WeatherService,
    private searchCityService: SearchCityService) {}

  ngOnInit(): void {
    this.getForecast();

    this.citySubscription = this.searchCityService.city$.subscribe(newCity => {
      if (newCity && newCity.trim() !== '' && newCity.trim().toLowerCase() !== this.city.toLowerCase()) {
        this.city = newCity.trim();
        this.getForecast();
      }
    });
  }

  getForecast(): void {
    
    this.error = '';
    this.forecast!;
    this.loading = true;
    
    if (this.apiCallSubscription)
      this.apiCallSubscription.unsubscribe();

    this.apiCallSubscription = this.weatherService.getFiveDaysForecast(this.city).subscribe({
      next: (data: FiveDaysWeatherDto[] | null) => {
        if (data !== null && data !== undefined)
        this.forecast = data;
        this.lastSuccessfulCity = this.city;
        this.loading = false;
        this.error = '';
        console.log(`Previsão de 5 dias para ${this.city}:`, data);
      },
      error: (err) => {
        console.error(`Erro ao buscar previsão para ${this.city}:`, err);
        this.error = 'Erro ao carregar a previsão do tempo para cinco dias.';
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.citySubscription) 
      this.citySubscription.unsubscribe();
    
    if (this.apiCallSubscription) 
      this.apiCallSubscription.unsubscribe();
  }
}
