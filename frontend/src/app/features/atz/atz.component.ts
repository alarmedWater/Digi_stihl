import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { forkJoin }          from 'rxjs';

import { MitarbeiterService } from '../mitarbeiter/services/mitarbeiter.service';
import { DepartmentService }  from '../mitarbeiter/services/department.service';
import { EmployeeDto }        from '../mitarbeiter/models/employee';
import { DepartmentDto }      from '../mitarbeiter/models/department';

/**
 * Represents an employee in partial retirement (ATZ) for display purposes.
 */
interface AtzMitarbeiter {
  name: string;
  abteilung: string;
  austrittsdatum: string;
  bemerkung: string;
}

/**
 * Component for managing and displaying employees in partial retirement (ATZ).
 */
@Component({
  selector: 'app-atz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './atz.component.html',
  styleUrls: ['./atz.component.scss']
})
export class AtzComponent implements OnInit {
  /**
   * List of employees in partial retirement.
   */
  atzMitarbeiter: AtzMitarbeiter[] = [];
  /**
   * The search term for filtering the list.
   */
  suchbegriff = '';

  constructor(
    private svc: MitarbeiterService,
    private deptSvc: DepartmentService
  ) {}

  /**
   * Initializes the component by loading employee and department data,
   * then filters for employees in partial retirement (ATZ) and maps them
   * to the display format.
   */
  ngOnInit(): void {
    forkJoin({
      emps:  this.svc.getMitarbeiter(),
      depts: this.deptSvc.getDepartments()
    }).subscribe(({ emps, depts }) => {
      const deptMap = new Map<string,string>(
        depts.map(d => [d.kostenstelle, d.abteilungsname])
      );
      const atzId = 3; // ID for partial retirement (ATZ)
      this.atzMitarbeiter = emps
        .filter(e => e.exitReasonId === atzId)
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

  /**
   * Filters the employee list based on the search term.
   * The search is performed across name, department, and exit date.
   */
  get gefilterteMitarbeiter(): AtzMitarbeiter {
    const q = this.suchbegriff.trim().toLowerCase();
    return this.atzMitarbeiter.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.abteilung.toLowerCase().includes(q) ||
      m.austrittsdatum.includes(q)
    );
  }

  /**
   * Formats an ISO date string to DD-MM-YYYY format.
   * @param iso The ISO date string.
   * @returns The formatted date string.
   */
  private formatDatum(iso: string): string {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2,'0');
    const mm = String(d.getMonth()+1).padStart(2,'0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }
}
