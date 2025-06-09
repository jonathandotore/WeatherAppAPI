import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  // Use o spread operator para combinar os providers existentes de appConfig
  // com os novos providers
  providers: [
    ...(appConfig.providers || []), // Garante que providers de appConfig sejam incluídos
    provideHttpClient()
  ]
});
