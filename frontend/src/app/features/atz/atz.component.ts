// src/app/features/mitarbeiter/components/atz/atz.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // für *ngFor
import { FormsModule } from '@angular/forms';   // für [(ngModel)]
import { MitarbeiterService } from '../mitarbeiter/services/mitarbeiter.service';
import { EmployeeDto } from '../mitarbeiter/models/employee';
 
// Ein Interface zur Typisierung der ATZ-Mitarbeiterdaten
interface ATZMitarbeiter {
  name: string;
  abteilung: string;
  austrittsdatum: string;
  bemerkung: string; // NEU
}

@Component({
  selector: 'app-atz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './atz.component.html',
  styleUrls: ['./atz.component.scss']
})
export class ATZComponent implements OnInit {

  // Liste der ATZ-Mitarbeiter aus dem Service
  atzMitarbeiter: ATZMitarbeiter[] = [];

  // Suchfeld zur Filterung
  suchbegriff: string = '';

  constructor(private svc: MitarbeiterService) {}

  ngOnInit(): void {
    this.svc.getMitarbeiter()
      .subscribe({
        next: (list: EmployeeDto[]) => {
          const ATZ_EXIT_REASON_ID = 3;  // Seeded ID für "Altersteilzeit"
          const atzList = list.filter(e => e.exitReasonId === ATZ_EXIT_REASON_ID);

          this.atzMitarbeiter = atzList.map(e => ({
            name: `${e.vorname} ${e.name}`,
            abteilung: e.kostenstelle,
            austrittsdatum:  e.kuendigung ? this.formatDatum(e.kuendigung) : '', //e.kuendigung ?? ''
            bemerkung: e.bemerkung ?? '' // NEU
          }));
        },
        error: err => console.error('Fehler beim Laden der ATZ-Mitarbeiter:', err)
      });
  }

  // Gefilterte Ausgabe
  get gefilterteMitarbeiter(): ATZMitarbeiter[] {
    const begriff = this.suchbegriff.toLowerCase();
    return this.atzMitarbeiter.filter(m =>
      m.name.toLowerCase().includes(begriff) ||
      m.abteilung.toLowerCase().includes(begriff) ||
      m.austrittsdatum.includes(begriff)
    );
  }

  private formatDatum(isoString: string): string {
    const datum = new Date(isoString);
    const tag = datum.getDate().toString().padStart(2, '0');
    const monat = (datum.getMonth() + 1).toString().padStart(2, '0');
    const jahr = datum.getFullYear();
    return `${tag}-${monat}-${jahr}`;
  }
  
}
