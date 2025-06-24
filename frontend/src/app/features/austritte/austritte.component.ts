// src/app/features/austritte/austritte.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { MitarbeiterService } from '../mitarbeiter/services/mitarbeiter.service';
import { EmployeeDto } from '../mitarbeiter/models/employee';

interface Austritt {
  name: string;
  abteilung: string;
  austrittsdatum: string;
  austrittsart: string; // NEU
}

@Component({
  selector: 'app-austritte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './austritte.component.html',
  styleUrls: ['./austritte.component.scss']
})
export class AustritteComponent implements OnInit {
  austritte: Austritt[] = [];
  suchbegriff: string = '';

  constructor(private mitarbeiterService: MitarbeiterService) {}

  ngOnInit(): void {
    this.mitarbeiterService.getMitarbeiter()
      .subscribe({
        next: (list: EmployeeDto[]) => {
          this.austritte = list
            // nur solche mit Austrittsdatum
            .filter(e => !!e.kuendigung)
            // mappe auf unsere Anzeige-Daten
            .map(e => ({
              name: `${e.vorname} ${e.name}`,
              abteilung: e.kostenstelle,     // oder andere Info, falls Du joinst
              austrittsdatum: e.kuendigung ? this.formatDatum(e.kuendigung) : '',
              austrittsart: e.exitReason?.description ?? ''  // NEU: Zugriff auf exitReason.description
            }));
        },
        error: err => console.error('Fehler beim Laden der Austritte:', err)
      });
  }

  get gefilterteAustritte(): Austritt[] {
    const begriff = this.suchbegriff.toLowerCase();
    return this.austritte.filter(a =>
      a.name.toLowerCase().includes(begriff) ||
      a.austrittsdatum.includes(begriff) ||
      a.austrittsart.toLowerCase().includes(begriff) // NEU
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
