// fluktuation.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   // für ngModel

interface FluktuationsEintrag {
  monat: string;
  jahr: number;
  agKuendigungen: number;
  anKuendigungen: number;
  sonstigeKuendigungen: number;
  gesamtmitarbeiter: number;
  fluktuationsrate: number;
}

@Component({
  selector: 'app-fluktuation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fluktuation.component.html',
  styleUrls: ['./fluktuation.component.scss']
})
export class FluktuationComponent {
  // Dummy-Daten zur Darstellung der Fluktuation
  daten: FluktuationsEintrag[] = [
    {
      monat: 'Januar',
      jahr: 2025,
      agKuendigungen: 2,
      anKuendigungen: 1,
      sonstigeKuendigungen: 0,
      gesamtmitarbeiter: 100,
      fluktuationsrate: 3.0
    },
    {
      monat: 'Februar',
      jahr: 2025,
      agKuendigungen: 1,
      anKuendigungen: 2,
      sonstigeKuendigungen: 1,
      gesamtmitarbeiter: 98,
      fluktuationsrate: 4.08
    }
  ];

  // Filter-Variablen
  ausgewaehlterMonat: string = '';
  ausgewaehltesJahr: number = 2025;

  // Hilfsfunktion zur Filterung nach Monat und Jahr
  get gefilterteDaten(): FluktuationsEintrag[] {
    return this.daten.filter(
      eintrag =>
        eintrag.jahr === this.ausgewaehltesJahr &&
        (this.ausgewaehlterMonat === '' || eintrag.monat === this.ausgewaehlterMonat)
    );
  }

  // Hilfsfunktion zum Abrufen aller verfügbaren Monate aus den Dummy-Daten
  get verfuegbareMonate(): string[] {
    return [...new Set(this.daten.map(e => e.monat))];
  }

  // Hilfsfunktion zum Abrufen aller verfügbaren Jahre aus den Dummy-Daten
  get verfuegbareJahre(): number[] {
    return [...new Set(this.daten.map(e => e.jahr))];
  }
}
