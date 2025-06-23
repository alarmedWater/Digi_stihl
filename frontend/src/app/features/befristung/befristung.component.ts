// src/app/features/befristung/befristung.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { MitarbeiterService } from '../mitarbeiter/services/mitarbeiter.service';

interface BefristeterMitarbeiter {
  name: string;
  abteilung: string;
  beschaeftigungsart: string;
  befristetBis: string;
}

@Component({
  selector: 'app-befristung',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './befristung.component.html',
  styleUrls: ['./befristung.component.scss']
})
export class BefristungComponent implements OnInit {
  // die initial leere Liste, gefüllt aus dem Service
  befristeteMitarbeiter: BefristeterMitarbeiter[] = [];

  suchbegriff: string = '';

  constructor(private mitarbeiterService: MitarbeiterService) {}

  ngOnInit() {
    // nur Befristete laden
    this.mitarbeiterService
      .getMitarbeiter({ arbeitsverhaeltnis: 'Befristet' })
      .subscribe({
        next: list => {
          // Mappe aus EmployeeDto zu Deinem Interface:
          this.befristeteMitarbeiter = list.map(e => ({
            name: `${e.vorname} ${e.name}`,
            abteilung: e.kostenstelle,           // oder: e.abteilung falls Du das mitjoinst
            beschaeftigungsart: e.arbeitsverhaeltnis,
            befristetBis: e.befristungMax ?? ''    // Dein Feld für „bis“
          }));
        },
        error: err => {
          console.error('Fehler beim Laden der befristeten MA:', err);
        }
      });
  }

  get gefilterteBefristete(): BefristeterMitarbeiter[] {
    const begriff = this.suchbegriff.toLowerCase();
    return this.befristeteMitarbeiter.filter(m =>
      m.name.toLowerCase().includes(begriff) ||
      m.abteilung.toLowerCase().includes(begriff) ||
      m.beschaeftigungsart.toLowerCase().includes(begriff) ||
      m.befristetBis.includes(begriff)
    );
  }
}
