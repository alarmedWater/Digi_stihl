import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatTableModule }     from '@angular/material/table';
import { forkJoin }           from 'rxjs';

import { MitarbeiterService } from '../mitarbeiter/services/mitarbeiter.service';
import { DepartmentService }  from '../mitarbeiter/services/department.service';
import { EmployeeDto } from '../mitarbeiter/models/employee';

/**
 * Interface representing a fixed-term employee for display.
 */
interface BefristeterMitarbeiter {
  name: string;
  abteilungsname: string;
  beschaeftigungsart: string;
  befristetBis: string;
}

/**
 * Component for displaying and filtering fixed-term employees.
 * It fetches employee and department data to show relevant information about fixed-term contracts.
 */
@Component({
  selector: 'app-befristung',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ],
  templateUrl: './befristung.component.html',
  styleUrls: ['./befristung.component.scss']
})
export class BefristungComponent implements OnInit {
  /** The search term used to filter the list of fixed-term employees. */
  suchbegriff = '';
  /** The list of fixed-term employees to be displayed. */
  befristeteMitarbeiter: BefristeterMitarbeiter[] = [];
  
  constructor(
    private mitarbeiterService: MitarbeiterService,
    private deptService: DepartmentService
  ) {}

  /**
   * Initializes the component.
   * Loads all departments and fixed-term employees concurrently.
   * Maps department names to employees and formats the data for display.
   */
  ngOnInit(): void {
    // Load all departments and fixed-term employees simultaneously.
    forkJoin({
      depts: this.deptService.getDepartments(),
      emps:  this.mitarbeiterService.getMitarbeiter({ arbeitsverhaeltnis: 'Befristet' })
    }).subscribe(({ depts, emps }) => {
      const deptMap = new Map<string,string>(
        depts.map(d => [d.kostenstelle, d.abteilungsname])
      );
      this.befristeteMitarbeiter = emps.map(e => ({
        name: `${e.vorname} ${e.name}`,
        abteilungsname: e.kostenstelle
          ? (deptMap.get(e.kostenstelle) ?? '–')
          : '–',
        beschaeftigungsart: e.arbeitsverhaeltnis,
        befristetBis: e.befristungMax
          ? this.formatDatum(e.befristungMax)
          : '–'
      }));
    });
  }

  /**
   * Returns a filtered list of fixed-term employees based on the search term.
   * The filter applies to name, department name, employment type, and contract end date.
   */
  get gefilterteBefristete(): BefristeterMitarbeiter[] {
    const q = this.suchbegriff.trim().toLowerCase();
    return this.befristeteMitarbeiter.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.abteilungsname.toLowerCase().includes(q) ||
      m.beschaeftigungsart.toLowerCase().includes(q) ||
      m.befristetBis.includes(q)
    );
  }

  /**
   * Formats an ISO date string to DD.MM.YYYY format.
   * @param iso The ISO date string to format.
   * @returns The formatted date string.
   */
  private formatDatum(iso: string): string {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2,'0');
    const mm = String(d.getMonth()+1).padStart(2,'0');
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  }
}
