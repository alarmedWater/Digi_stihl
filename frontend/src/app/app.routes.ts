import { Routes } from '@angular/router';
import { AnlegenComponent } from './features/mitarbeiter/components/anlegen/anlegen.component';
import { BearbeitenComponent } from './features/mitarbeiter/components/bearbeiten/bearbeiten.component';
import { KapazitaetsabweichungComponent } from './features/mitarbeiter/kapazitaetsabweichung/kapazitaetsabweichung.component';
import { DirMitarbeiterComponent } from './features/auswertungen/dir-mitarbeiter/dir-mitarbeiter.component';
import { IndirMitarbeiterComponent } from './features/auswertungen/indir-mitarbeiter/indir-mitarbeiter.component';
import { AtzComponent } from './features/atz/atz.component';
import { BefristungComponent } from './features/befristung/befristung.component';
import { AustritteComponent } from './features/austritte/austritte.component';
import { FluktuationComponent } from './features/fluktuation/fluktuation.component';
import { PersonalentwicklungComponent } from './features/personalentwicklung/personalentwicklung.component';

/**
 * Defines the application's routes.
 * Each route maps a URL path to a component.
 */
export const routes: Routes = [
  // Route for creating a new employee
  { path: 'mitarbeiter-anlegen', component: AnlegenComponent },
  // Route for editing an existing employee
  { path: 'mitarbeiter-bearbeiten', component: BearbeitenComponent },
  // Route for managing capacity deviations
  { path: 'kapazitaetsabweichung', component: KapazitaetsabweichungComponent },
  // Route for evaluating direct employee capacity
  { path: 'kapazitaetsauswertung-dir', component: DirMitarbeiterComponent },
  // Route for evaluating indirect employee capacity
  { path: 'kapazitaetsauswertung-indir', component: IndirMitarbeiterComponent },
  // Route for managing partial retirement
  { path: 'atz', component: AtzComponent },
  // Route for managing fixed-term contracts
  { path: 'befristung', component: BefristungComponent },
  // Route for managing employee departures
  { path: 'austritte', component: AustritteComponent },
  // Route for analyzing employee fluctuation
  { path: 'fluktuation', component: FluktuationComponent },
  // Route for managing personnel development
  { path: 'personalentwicklung', component: PersonalentwicklungComponent },
  // Wildcard route that redirects to the 'mitarbeiter-anlegen' path if no other route matches
  { path: '**', redirectTo: 'mitarbeiter-anlegen' }
];
