import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CurrentWeatherDto } from '../../../models/current-weather';

@Component({
  selector: 'app-weather',
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})

export class WeatherComponent {
  city: string = '';
  weather: CurrentWeatherDto | null = null;
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  getCurrentCityForecastWeather(city: string) {
    if (!this.city) return;

    this.weatherService.getCurrentWeatherAsync(city).subscribe({
      next: (data) => {
        this.weather = data;
        this.errorMessage = '';
      },
      error: () => {
        this.weather = null,
        this.errorMessage = "Erro ao buscar o clima. Verifique e tent novamente";
      }
    });
  }
}
