// src/app/features/mitarbeiter/components/atz/atz.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { forkJoin }          from 'rxjs';

import { MitarbeiterService } from '../mitarbeiter/services/mitarbeiter.service';
import { DepartmentService }  from '../mitarbeiter/services/department.service';
import { EmployeeDto }        from '../mitarbeiter/models/employee';
import { DepartmentDto }      from '../mitarbeiter/models/department';

// Typ für unsere angezeigten ATZ-Einträge
interface ATZMitarbeiter {
  name: string;
  abteilung: string;
  austrittsdatum: string;
  bemerkung: string;
}

@Component({
  selector: 'app-atz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './atz.component.html',
  styleUrls: ['./atz.component.scss']
})
export class ATZComponent implements OnInit {
  atzMitarbeiter: ATZMitarbeiter[] = [];
  suchbegriff = '';

  constructor(
    private svc: MitarbeiterService,
    private deptSvc: DepartmentService
  ) {}

  ngOnInit(): void {
    // parallel Empfänger-Daten und Abteilungen laden
    forkJoin({
      emps:  this.svc.getMitarbeiter(),
      depts: this.deptSvc.getDepartments()
    }).subscribe(({ emps, depts }) => {
      // Map: Kostenstelle → Abteilungsname
      const deptMap = new Map<string,string>(
        depts.map(d => [d.kostenstelle, d.abteilungsname])
      );
      // Nur ATZ (ExitReasonId === 3) filtern und umwandeln
      const ATZ_ID = 3;
      this.atzMitarbeiter = emps
        .filter(e => e.exitReasonId === ATZ_ID)
        .map(e => ({
          name: `${e.vorname} ${e.name}`,
          abteilung: e.kostenstelle
            ? (deptMap.get(e.kostenstelle) ?? '–')
            : '–',
          austrittsdatum: e.kuendigung
            ? this.formatDatum(e.kuendigung)
            : '–',
          bemerkung: e.bemerkung ?? ''
        }));
    });
  }

  /** Live-Filter über Name, Abteilung oder Datum */
  get gefilterteMitarbeiter(): ATZMitarbeiter[] {
    const q = this.suchbegriff.trim().toLowerCase();
    return this.atzMitarbeiter.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.abteilung.toLowerCase().includes(q) ||
      m.austrittsdatum.includes(q)
    );
  }

  /** Kurzformat DD-MM-YYYY */
  private formatDatum(iso: string): string {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2,'0');
    const mm = String(d.getMonth()+1).padStart(2,'0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }
}
