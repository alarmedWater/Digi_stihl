// src/main.ts
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// 1) Zeige in der Konsole, welches Environment wirklich geladen wurde
console.log('Active environment:', environment);

// 2) Falls production-Flag gesetzt ist, teste den Prod‐Modus
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error('Bootstrap error:', err));
