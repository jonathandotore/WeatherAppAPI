import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FiveDaysWeatherComponent } from "./components/five-days-weather/five-days-weather.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FiveDaysWeatherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'weather-app';
}
