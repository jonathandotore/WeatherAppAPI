import { Component, OnInit } from '@angular/core';
import { CurrentWeatherDto } from '../../../models/current-weather';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-currentday-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currentday-weather.component.html',
  styleUrl: './currentday-weather.component.scss'
})

export class CurrentdayWeatherComponent implements OnInit {
  
  forecast: CurrentWeatherDto = {} as CurrentWeatherDto;
  city: string = 'São Paulo';
  loading: boolean = false;
  error: string = '';

  constructor(private weatherService: WeatherService) {}
  
  ngOnInit(): void {
    this.getForecast();
  }

  getForecast(): void {
    this.loading = true;
    this.weatherService.getCurrentWeatherAsync(this.city).subscribe({
      next: (data) => {
        this.forecast = data;
        this.loading = false;
      },
      error: () => {
        this.error = "Erro ao tentar a busca na cidade solicitada. Verifique a cidade e tente novamente";
        this.loading = false;
      }
    });
  }
}
