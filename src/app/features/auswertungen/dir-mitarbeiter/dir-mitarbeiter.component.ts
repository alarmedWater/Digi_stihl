import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

// Struktur für einen einzelnen Mitarbeitereintrag
interface MitarbeiterEintrag {
  name: string;
  abteilung: string;
  fte: number[]; // FTE-Werte für 24 Monate
}

@Component({
  selector: 'app-dir-mitarbeiter',
  standalone: true,
  templateUrl: './dir-mitarbeiter.component.html',
  styleUrls: ['./dir-mitarbeiter.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ]
})
export class DirMitarbeiterComponent implements OnInit {

  // Dynamisch generierte Monatsnamen ab dem aktuellen Monat
  monateLabels: string[] = [];

  // Spaltenüberschriften für die Tabelle (Name, Abteilung, Monate)
  displayedColumns: string[] = ['name', 'abteilung'];

  // Abteilungen zur Filterauswahl
  abteilungen: string[] = [];
  gewaehlteAbteilung: string = ''; // aktuell ausgewählter Filter

  // Alle Einträge
  alleDaten: MitarbeiterEintrag[] = [];

  // Gefilterte Ansicht
  gefilterteDaten: MitarbeiterEintrag[] = [];

  ngOnInit(): void {
    // Dynamische Monatsnamen erstellen
    const heute = new Date();
    for (let i = 0; i < 24; i++) {
      const monat = new Date(heute.getFullYear(), heute.getMonth() + i, 1);
      const label = monat.toLocaleString('de-DE', { month: 'short', year: 'numeric' });
      this.monateLabels.push(label);
      this.displayedColumns.push(`monat${i + 1}`);
    }

    // Dummy-Daten
    this.alleDaten = [
      {
        name: 'Max Müller',
        abteilung: 'Produktion',
        fte: [1, 1, 0.8, 0.8, 0.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      },
      {
        name: 'Laura Schmitz',
        abteilung: 'Produktion',
        fte: [1, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      },
      {
        name: 'Anna Schneider',
        abteilung: 'IT',
        fte: Array(24).fill(1)
      },
      {
        name: 'Jonas Braun',
        abteilung: 'IT',
        fte: [1, 1, 1, 1, 0.5, 0.5, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      }
    ];

    // Abteilungen extrahieren für Filterdropdown
    this.abteilungen = Array.from(new Set(this.alleDaten.map(m => m.abteilung)));

    // Anfangsansicht: alle anzeigen
    this.gefilterteDaten = [...this.alleDaten];
  }

  // Filtert nach gewählter Abteilung
  filterNachAbteilung(): void {
    if (!this.gewaehlteAbteilung) {
      this.gefilterteDaten = [...this.alleDaten];
    } else {
      this.gefilterteDaten = this.alleDaten.filter(m => m.abteilung === this.gewaehlteAbteilung);
    }


    
  }
}
