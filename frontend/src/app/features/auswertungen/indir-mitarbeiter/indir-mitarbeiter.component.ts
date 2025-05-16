import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

// Datenmodell für einen Mitarbeitereintrag
interface IndirekterMitarbeiter {
  name: string;
  abteilung: string;
  fte: number[]; // FTE-Werte für 24 Monate
}

@Component({
  selector: 'app-indir-mitarbeiter',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSelectModule, FormsModule],
  templateUrl: './indir-mitarbeiter.component.html',
  styleUrls: ['./indir-mitarbeiter.component.scss']
})
export class IndirMitarbeiterComponent implements OnInit {

  // Dynamische Monatslabels ab aktuellem Monat
  monateLabels: string[] = [];
  gefilterteDaten: IndirekterMitarbeiter[] = [];
  ausgewaehlteAbteilung: string = '';
  displayedColumns: string[] = ['name', 'abteilung', ...Array.from({ length: 24 }, (_, i) => `monat${i + 1}`)];

  // Beispiel-Daten (Dummy)
  daten: IndirekterMitarbeiter[] = [
    {
      name: 'Sophie Weber',
      abteilung: 'Personal',
      fte: [1, 1, 1, 0.8, 0.8, 0.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    {
      name: 'Tim Schröder',
      abteilung: 'Controlling',
      fte: [1, 1, 1, 1, 1, 1, 0.6, 0.6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }
  ];

  ngOnInit(): void {
    this.monateLabels = this.generiereMonatsLabels();
    this.gefilterteDaten = [...this.daten];
  }

  // Labels wie "Apr 2025", "Mai 2025", ...
  generiereMonatsLabels(): string[] {
    const labels: string[] = [];
    const now = new Date();
    let monat = now.getMonth();
    let jahr = now.getFullYear();

    for (let i = 0; i < 24; i++) {
      const date = new Date(jahr, monat + i, 1);
      const formatter = new Intl.DateTimeFormat('de-DE', { month: 'short', year: 'numeric' });
      labels.push(formatter.format(date));
    }

    return labels;
  }

  // Gibt eindeutige Abteilungen zurück
  get abteilungen(): string[] {
    return [...new Set(this.daten.map(m => m.abteilung))];
  }

  // Filtert die Datenliste nach Abteilung
  filternNachAbteilung(): void {
    if (!this.ausgewaehlteAbteilung) {
      this.gefilterteDaten = [...this.daten];
    } else {
      this.gefilterteDaten = this.daten.filter(d => d.abteilung === this.ausgewaehlteAbteilung);
    }
  }
}
