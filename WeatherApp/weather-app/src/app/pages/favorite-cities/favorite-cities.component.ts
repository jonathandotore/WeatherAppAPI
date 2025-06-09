import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteCitiesService } from '../../shared/favorite-cities.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SearchCityService } from '../../shared/search-city.service';

@Component({
  selector: 'app-favorite-cities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-cities.component.html',
})

export class FavoriteCitiesComponent {
  favoriteCities: string[] = [];
  
  private favoritesSubscription!: Subscription;

  constructor(
    private favoriteCitiesService: FavoriteCitiesService,
    private router: Router,
    private searchCityService: SearchCityService ) {}

  ngOnInit(): void {
    this.favoritesSubscription = this.favoriteCitiesService.favoriteCities$.subscribe(cities => {
      this.favoriteCities = cities;
    });
  }

  removeFavorite(city: string): void {
    this.favoriteCitiesService.removeFavoriteCity(city);
  }

  viewWeather(city: string): void {
    // Ao clicar em uma cidade favorita, navega para a rota principal e pesquisa essa cidade
    this.searchCityService.setCity(city);
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.favoritesSubscription)
      this.favoritesSubscription.unsubscribe();
  }
}
