import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CarouselModule } from 'ngx-bootstrap/carousel';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(CarouselModule.forRoot()),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
