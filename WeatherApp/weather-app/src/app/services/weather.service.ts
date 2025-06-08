import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CurrentWeatherDto } from '../../models/current-weather';
import { FiveDaysWeatherDto } from '../../models/five-days-weather-dto';
import { ServiceResponse } from '../../models/service-response';


@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  
  private baseUrl = "https://localhost:5198/api/weather/currentcity";

  constructor(private http: HttpClient) {}

  getCurrentWeatherAsync(city: string): Observable<CurrentWeatherDto> {
    return this.http
      .get<ServiceResponse<CurrentWeatherDto>>(`${this.baseUrl}/${city}`)
      .pipe(map((response) => response.data));
  }

  getFiveDaysForecast(city: string): Observable<FiveDaysWeatherDto[]> {
    return this.http
      .get<ServiceResponse<FiveDaysWeatherDto[]>>(`${this.baseUrl}/weatherforecastfivedays/${city}`)
      .pipe(map((response) => response.data));
  }
}
