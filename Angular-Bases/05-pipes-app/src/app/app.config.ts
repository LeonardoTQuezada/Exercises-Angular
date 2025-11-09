import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import localeEs from '@angular/common/locales/es'; // Importar datos de localización para español
import localeFr from '@angular/common/locales/fr'; // Importar datos de localización para francés

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es'); // Configurar el locale 'es' (español)
registerLocaleData(localeFr, 'fr');

import { LocaleService } from './services/locale.service';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: LOCALE_ID,
     // useValue: 'es'  // Establecer el locale predeterminado a español
       deps: [LocaleService], // Inyectar el servicio de localización
      useFactory: (localeService: LocaleService) => localeService.getLocale, // Usar el locale actual del servicio
    },
  ],
};
