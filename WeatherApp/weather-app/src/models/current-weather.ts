export interface CurrentWeatherDto {
  cityName: string;
  temperature: number;
  minTemperature: number;
  maxTemperature: number;
  condition: string;
  humidity: number;
  icon: string;
  wind: number;
  feels_like: number;
  pressure: number;
}