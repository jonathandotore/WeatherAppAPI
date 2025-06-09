import { Component } from '@angular/core';
import { CurrentdayWeatherComponent } from "../../components/currentday-weather/currentday-weather.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { FiveDaysWeatherComponent } from "../../components/five-days-weather/five-days-weather.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CurrentdayWeatherComponent, SearchInputComponent, FiveDaysWeatherComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  
  constructor() {}
}
