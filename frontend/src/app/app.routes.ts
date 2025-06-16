import { Routes } from '@angular/router';
import { AnlegenComponent } from './features/mitarbeiter/components/anlegen/anlegen.component';
import { BearbeitenComponent } from './features/mitarbeiter/components/bearbeiten/bearbeiten.component';
import { KapazitaetsabweichungComponent } from './features/mitarbeiter/kapazitaetsabweichung/kapazitaetsabweichung.component';
import { DirMitarbeiterComponent } from './features/auswertungen/dir-mitarbeiter/dir-mitarbeiter.component';
import { IndirMitarbeiterComponent } from './features/auswertungen/indir-mitarbeiter/indir-mitarbeiter.component';
import { ATZComponent } from './features/atz/atz.component';
import { BefristungComponent } from './features/befristung/befristung.component';
import { AustritteComponent } from './features/austritte/austritte.component';
import { FluktuationComponent } from './features/fluktuation/fluktuation.component';
import { PersonalentwicklungComponent } from './features/personalentwicklung/personalentwicklung.component';

export const routes: Routes = [
  { path: 'mitarbeiter-anlegen', component: AnlegenComponent },
  { path: 'mitarbeiter-bearbeiten', component: BearbeitenComponent },
  { path: 'kapazitaetsabweichung', component: KapazitaetsabweichungComponent },
  { path: 'kapazitaetsauswertung-dir', component: DirMitarbeiterComponent },
  { path: 'kapazitaetsauswertung-indir', component: IndirMitarbeiterComponent },
  { path: 'atz', component: ATZComponent },
  { path: 'befristung', component: BefristungComponent },
  { path: 'austritte', component: AustritteComponent },
  { path: 'fluktuation', component: FluktuationComponent },
  { path: 'personalentwicklung', component: PersonalentwicklungComponent },
  { path: '**', redirectTo: 'mitarbeiter-anlegen' }
];
