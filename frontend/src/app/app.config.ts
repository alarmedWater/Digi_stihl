import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { routes } from './app.routes';

/**
 * The main application configuration for the Angular application.
 * Defines the providers for various services and modules required by the application.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Provides zone.js change detection with event coalescing for better performance.
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Configures the Angular router with the defined application routes.
    provideRouter(routes),
    // Provides the HttpClient service for making HTTP requests.
    provideHttpClient(),
    // Provides animation capabilities for Angular components.
    provideAnimations(),
    // Imports and provides modules that are not standalone components.
    importProvidersFrom(MatSidenavModule, MatListModule)
  ]
};

