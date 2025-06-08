import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FiveDaysWeatherComponent } from "./components/five-days-weather/five-days-weather.component";
import { CurrentdayWeatherComponent } from './components/currentday-weather/currentday-weather.component';
import { SearchInputComponent } from "./components/search-input/search-input.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FiveDaysWeatherComponent, CurrentdayWeatherComponent, SearchInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'weather-app';
}
