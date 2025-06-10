import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

interface FavoriteCityBackend {
  id?: number;        // Opcional, se o backend gerar o ID
  cityId: string;    // Exemplo: pode ser o nome da cidade ou um ID interno do backend para a cidade
  cityName: string; // userId?: string; // O backend provavelmente infere isso do token
}

@Injectable({
  providedIn: 'root'
})

export class FavoriteCitiesService {

  private apiURL = 'http://localhost:5198/api/FavoriteCity';
  private FAV_KEY = 'favoriteCities';
  private _favoriteCities = new BehaviorSubject<string[]>(this.loadFavoriteCitiesFromLocalStorage());

  // Observable público para que outros componentes possam se inscrever e reagir a mudanças
  public readonly favoriteCities$: Observable<string[]> = this._favoriteCities.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    // Escuta as mudanças no estado de autenticação
    this.authService.currentUser.subscribe(user => {
      if (user && user.success) {
        // Se o usuário está logado, tenta carregar favoritos do backend
        this.loadFavoriteCitiesFromBackend();
      } 
      else {
        // Se o usuário deslogou, limpa os favoritos locais
        this.clearLocalFavorites();
      }
    });

    // Chama o carregamento inicial se já houver um usuário logado ao iniciar o serviço
    if (this.authService.isLogged()) {
      this.loadFavoriteCitiesFromBackend();
    } 
    else {
      // Se não estiver logado no início, apenas carrega do localStorage (se houver)
      this._favoriteCities.next(this.loadFavoriteCitiesFromLocalStorage());
    }

  }
  
  // Helper para obter os headers de autorização
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    }
    // Se não houver token, retorna headers sem autorização (requisição provavelmente falhará com 401)
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  // NOVO: Limpa os favoritos locais (localStorage e BehaviorSubject)
  private clearLocalFavorites(): void {
    localStorage.removeItem(this.FAV_KEY);
    this._favoriteCities.next([]);
  }
  
  //Carrega as cidades favoritas do localStorage
  private loadFavoriteCitiesFromLocalStorage() : string[] {
    const favs = localStorage.getItem(this.FAV_KEY);
    return favs ? JSON.parse(favs) : [];
  }
  
  //Persite no localStorage
  private saveFavoritesToLocalStorageAndNotify(cities: string[]): void {
    localStorage.setItem(this.FAV_KEY, JSON.stringify(cities));
    this._favoriteCities.next(cities);
  }

  // Salva as cidades favoritas no localStorage
  addFavoriteCity(city: string): void {
    const currentFavorites = this.loadFavoriteCitiesFromLocalStorage();
    const normalizedCity = city.trim().toLowerCase();

    if (!currentFavorites.includes(normalizedCity)) {
      const updatedFavorites = [...currentFavorites, normalizedCity];
      this.saveFavoritesToLocalStorageAndNotify(updatedFavorites);
    }
  }

  removeFavoriteCity(city: string): void {
    const currentFavorites = this.loadFavoriteCitiesFromLocalStorage();
    const normalizedCity = city.trim().toLowerCase();

    const updatedFavorites = currentFavorites.filter(favCity => favCity !== normalizedCity);
    this.saveFavoritesToLocalStorageAndNotify(updatedFavorites);
  }

    // Verifica se a cidade está na lista de favoritos (agora usa o BehaviorSubject)
  isFavorite(city: string): boolean {
    const normalizedCity = city.trim().toLowerCase();
    return this._favoriteCities.value.includes(normalizedCity);
  }

  // NOVO: Carrega as cidades favoritas do backend para o usuário logado
  loadFavoriteCitiesFromBackend(): void {
    if (!this.authService.isLogged()) {
      console.log('Usuário não logado, não é possível carregar favoritos do backend.');
      this.clearLocalFavorites(); // Garante que não haja favoritos "falsos" se deslogado
      return;
    }

    const headers = this.getAuthHeaders();

    this.http.get<FavoriteCityBackend[]>(`${this.apiURL}/userFavorites`, { headers }).pipe(
      tap(backendFavorites => {
        const favoriteCityNames = backendFavorites.map(fav => fav.cityName.toLowerCase()); // Normaliza para minúsculas
        this.saveFavoritesToLocalStorageAndNotify(favoriteCityNames); // Atualiza local e notifica
        console.log('Cidades favoritas carregadas do backend:', favoriteCityNames);
      }),
      catchError(error => {
        console.error('Erro ao carregar cidades favoritas do backend:', error);
        // Em caso de erro (ex: 401 Unauthorized, 403 Forbidden), limpa os favoritos locais
        this.clearLocalFavorites();
        return of([]); // Retorna um Observable vazio para não quebrar a cadeia
      })
    ).subscribe();
  }

  // Adiciona a cidade favorita (local e no backend)
  addFavoriteCityToBackend(city: string): void {
    const normalizedCity = city.trim().toLowerCase();
    const currentFavorites = this._favoriteCities.value; // Use o valor atual do BehaviorSubject

    if (currentFavorites.includes(normalizedCity)) {
      console.log(`"${city}" já é uma cidade favorita.`);
      return; // Já é favorito, não faz nada
    }

    // Adiciona localmente primeiro para resposta rápida da UI
    const updatedFavoritesLocal = [...currentFavorites, normalizedCity];
    this.saveFavoritesToLocalStorageAndNotify(updatedFavoritesLocal);

    if (this.authService.isLogged()) {
      const headers = this.getAuthHeaders();
      const favoriteData: FavoriteCityBackend = { cityId: normalizedCity, cityName: normalizedCity }; // Ajuste cityId conforme seu backend

      this.http.post<any>(this.apiURL, favoriteData, { headers }).pipe(
        tap(response => console.log('Cidade adicionada aos favoritos no backend:', response)),
        catchError(error => {
          console.error('Erro ao adicionar cidade favorita no backend:', error);
          // Se falhar no backend, recarrega do backend para sincronizar novamente
          // ou reverte a mudança local se preferir
          this.loadFavoriteCitiesFromBackend();
          return throwError(() => new Error('Falha ao adicionar favorito no backend.'));
        })
      ).subscribe();
    } else {
      console.warn('Usuário não logado. Favorito adicionado apenas localmente e não será persistido no backend.');
    }
  }

  // Remove a cidade favorita (local e do backend)
  removeFavoriteCityFromBackend(city: string): void {
    const normalizedCity = city.trim().toLowerCase();
    const currentFavorites = this._favoriteCities.value; // Use o valor atual do BehaviorSubject

    if (!currentFavorites.includes(normalizedCity)) {
      console.log(`"${city}" não está na lista de favoritos.`);
      return; // Não é favorito, não faz nada
    }

    // Remove localmente primeiro para resposta rápida da UI
    const updatedFavoritesLocal = currentFavorites.filter(favCity => favCity !== normalizedCity);
    this.saveFavoritesToLocalStorageAndNotify(updatedFavoritesLocal);

    if (this.authService.isLogged()) {
      const headers = this.getAuthHeaders();
      // Assumindo a rota DELETE por nome da cidade, conforme discutido
      this.http.delete<any>(`${this.apiURL}/deletebyname/${normalizedCity}`, { headers }).pipe(
        tap(response => console.log('Cidade removida dos favoritos no backend:', response)),
        catchError(error => {
          console.error('Erro ao remover cidade favorita do backend:', error);
          // Se falhar no backend, recarrega do backend para sincronizar novamente
          this.loadFavoriteCitiesFromBackend();
          return throwError(() => new Error('Falha ao remover favorito no backend.'));
        })
      ).subscribe();
    } else {
      console.warn('Usuário não logado. Favorito removido apenas localmente.');
    }
  }
}
