import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrentWeatherDto } from '../../../models/current-weather';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SearchCityService } from '../../shared/search-city.service';
import { ServiceResponse } from '../../../models/service-response';
import { FavoriteCitiesService } from '../../shared/favorite-cities.service';


@Component({
  selector: 'app-currentday-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currentday-weather.component.html',
})

export class CurrentdayWeatherComponent implements OnInit, OnDestroy {
  
  forecast: CurrentWeatherDto = {} as CurrentWeatherDto;
  city: string = 'São José do Rio Preto';
  lastSuccessfulCity: string = 'São José do Rio Preto';
  loading: boolean = false;
  error: string = '';
  isFavoriteCity: boolean = false;

  private citySubscription!: Subscription;
  private apiCallSubscription!: Subscription;
  private favoriteStatusSubscription!: Subscription; //Monitora o etado do favorito

  constructor(
    private weatherService: WeatherService,
    private searchCityService: SearchCityService,
    private favoriteCitiesService: FavoriteCitiesService ) {}
  
  ngOnInit(): void {
    //Carrega a cidade padrão
    this.getForecast();

    //Recebe as mudanças na cidade pesquisada
    this.citySubscription = this.searchCityService.city$.subscribe(newCity => {
      if (newCity && newCity.trim() !== '' && newCity.trim().toLowerCase() !== this.city.toLowerCase()) {
        this.city = newCity.trim();
        this.getForecast();
      }
    });

    // Inscreve-se para monitorar o estado de favorito da cidade atual
    this.favoriteStatusSubscription = this.favoriteCitiesService.favoriteCities$.subscribe(favorites => {
      this.isFavoriteCity = this.favoriteCitiesService.isFavorite(this.city);
    });
  }

  getForecast(): void {
    this.loading = true;
    
    if (this.apiCallSubscription) 
      this.apiCallSubscription.unsubscribe();

    this.apiCallSubscription = this.weatherService.getCurrentWeatherAsync(this.city).subscribe({
      next: (data: CurrentWeatherDto | null) => {
        if (data !== null && data !== undefined)
        this.forecast = data;
        this.lastSuccessfulCity = this.city
        this.isFavoriteCity = this.favoriteCitiesService.isFavorite(this.lastSuccessfulCity);
        this.loading = false;
        console.log(`Clima atual para ${this.city}:`,data)
      },
      error: (err) => {
        console.error(`Erro ao buscar clima para ${this.city}:`, err);
        this.error = "Erro ao tentar a busca na cidade solicitada. Verifique a cidade e tente novamente";
        this.isFavoriteCity = this.favoriteCitiesService.isFavorite(this.lastSuccessfulCity);
        this.loading = false;
        this.forecast!;
      }
    });
  }

    // Método para adicionar/remover dos favoritos
  toggleFavorite(): void {
    if (!this.isFavoriteCity)
      this.favoriteCitiesService.addFavoriteCity(this.city);
    else
      this.favoriteCitiesService.removeFavoriteCity(this.city);


    
  }

  ngOnDestroy(): void {
    // Desinscrever para evitar vazamento de memória
    if (this.citySubscription)
      this.citySubscription.unsubscribe();

    if (this.apiCallSubscription)
      this.apiCallSubscription.unsubscribe();

    if (this.favoriteStatusSubscription)
      this.favoriteStatusSubscription.unsubscribe();
  }
}
