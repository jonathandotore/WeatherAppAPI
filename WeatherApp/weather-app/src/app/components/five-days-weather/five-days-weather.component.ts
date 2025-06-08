import { Component, OnInit } from '@angular/core';
import { FiveDaysWeatherDto } from '../../../models/five-days-weather-dto';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-five-days-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './five-days-weather.component.html',
  styleUrl: './five-days-weather.component.scss'
})

export class FiveDaysWeatherComponent implements OnInit {

  forecast: FiveDaysWeatherDto[] = [];
  city: string = 'São José do Rio Preto';
  loading: boolean = false;
  error: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getForecast();
  }

  getForecast(): void {
    this.loading = true;
    this.weatherService.getFiveDaysForecast(this.city).subscribe({
      next: (data) => {
        this.forecast = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar a previsão do tempo para cinco dias.';
        this.loading = false;
      }
    });
  }
}
