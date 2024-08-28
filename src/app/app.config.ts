import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SafePipe } from './pipes/safe.pipe';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(CarouselModule.forRoot(), SafePipe),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
