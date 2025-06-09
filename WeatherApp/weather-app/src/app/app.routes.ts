import { Routes } from '@angular/router';
import { FavoriteCitiesComponent } from './pages/favorite-cities/favorite-cities.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'ClimaApp'},
    { path: 'cidadesfavoritas', component: FavoriteCitiesComponent, title: 'Cidades favoritas'},
    { path: '**', redirectTo: '' }
];
