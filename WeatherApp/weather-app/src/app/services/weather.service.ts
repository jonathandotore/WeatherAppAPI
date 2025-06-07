import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CurrentWeatherDto {
  cityName: string;
  temperature: number;
  minTemperature: number;
  maxTemperature: number;
  condition: string;
  humidity: number;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  
  private baseUrl = "http://localhost:5198/api/Weather";

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<CurrentWeatherDto> {
    return this.http.get<CurrentWeatherDto>(`${this.baseUrl}/${city}`);
  }
}
