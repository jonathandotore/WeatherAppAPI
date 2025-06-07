export interface CurrentWeatherDto {
  cityName: string;
  temperature: number;
  minTemperature: number;
  maxTemperature: number;
  condition: string;
  humidity: number;
  icon: string;
}