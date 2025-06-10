import { Routes } from '@angular/router';
import { FavoriteCitiesComponent } from './pages/favorite-cities/favorite-cities.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'ClimaApp'},
    { path: 'cidadesfavoritas', component: FavoriteCitiesComponent, title: 'Cidades favoritas'},
    { path: 'login', component: LoginComponent, title: 'Efetuar login'},
    { path: 'register', component: RegisterComponent, title: 'Efetuar cadastro'},
    { path: '**', redirectTo: '' },
];
