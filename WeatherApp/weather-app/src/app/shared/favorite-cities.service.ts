import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FavoriteCitiesService {

  private FAV_KEY = 'favoriteCities';
  private _favoriteCities = new BehaviorSubject<string[]>(this.loadFavoriteCities());

  // Observable público para que outros componentes possam se inscrever e reagir a mudanças
  public readonly favoriteCities$: Observable<string[]> = this._favoriteCities.asObservable();

  constructor() { }

  //Carrega as cidades favoritas do localStorage
  private loadFavoriteCities() : string[] {
    const favs = localStorage.getItem(this.FAV_KEY);
    return favs ? JSON.parse(favs) : [];
  }
  
  //Persite no localStorage
  private saveFavorites(cities: string[]): void {
    localStorage.setItem(this.FAV_KEY, JSON.stringify(cities));
    this._favoriteCities.next(cities);
  }

  // Salva as cidades favoritas no localStorage
  addFavoriteCity(city: string): void {
    const currentFavorites = this.loadFavoriteCities();
    const normalizedCity = city.trim().toLowerCase();

    if (!currentFavorites.includes(normalizedCity)) {
      const updatedFavorites = [...currentFavorites, normalizedCity];
      this.saveFavorites(updatedFavorites);
    }
  }

  removeFavoriteCity(city: string): void {
    const currentFavorites = this.loadFavoriteCities();
    const normalizedCity = city.trim().toLowerCase();

    const updatedFavorites = currentFavorites.filter(favCity => favCity !== normalizedCity);
    this.saveFavorites(updatedFavorites);
  }

  isFavorite(city: string): boolean {
    const normalizedCity = city.trim().toLowerCase();
    return this.loadFavoriteCities().includes(normalizedCity);
  }
}
