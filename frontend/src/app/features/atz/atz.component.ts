import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { forkJoin }          from 'rxjs';

import { MitarbeiterService } from '../mitarbeiter/services/mitarbeiter.service';
import { DepartmentService }  from '../mitarbeiter/services/department.service';
import { EmployeeDto }        from '../mitarbeiter/models/employee';
import { DepartmentDto }      from '../mitarbeiter/models/department';

/**
 * Interface for displaying ATZ (partial retirement) entries.
 */
interface AtzMitarbeiter {
  name: string;
  abteilung: string;
  austrittsdatum: string;
  bemerkung: string;
}

/**
 * Component to display employees in partial retirement (ATZ).
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
   * Initializes the component by loading and processing employee and department data.
   */
  ngOnInit(): void {
    // Load employee and department data in parallel.
    forkJoin({
      emps:  this.svc.getMitarbeiter(),
      depts: this.deptSvc.getDepartments()
    }).subscribe(({ emps, depts }) => {
      // Create a map from cost center to department name.
      const deptMap = new Map<string,string>(
        depts.map(d => [d.kostenstelle, d.abteilungsname])
      );
      // Filter for employees with ExitReasonId === 3 (ATZ) and map to the display format.
      const atzId = 3;
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
   * Filters the employee list based on the search term (name, department, or date).
   */
  get gefilterteMitarbeiter(): AtzMitarbeiter[] {
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
