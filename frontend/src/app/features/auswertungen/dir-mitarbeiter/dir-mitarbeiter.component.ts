import { Component, OnInit } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { MatTableModule }      from '@angular/material/table';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatSelectModule }     from '@angular/material/select';

import {
  DirectCapacityOverviewDto,
  DepartmentCapacityOverviewDto,
  EmployeeCapacityDto
} from '../../mitarbeiter/models/capacity.dtos';
import { CapacityService } from '../../mitarbeiter/services/capacity.service';

/**
 * Represents an employee entry with their 24-month FTE values.
 */
interface MitarbeiterEintrag {
  name: string;
  fte:  number[];  // 24 values
}

/**
 * Defines a data block for a department in the direct capacity overview.
 * Includes department details, headcount, monthly FTE subtotals, total FTE, and employee list.
 */
interface AbteilungsBlock {
  departmentName: string;
  headCount:      number;
  subtotalFte:    number[];          // 24 values
  totalFte:       number;            // Sum of all subtotalFte
  employees:      MitarbeiterEintrag[];
}

/**
 * Component for displaying the direct employee capacity overview.
 * It fetches capacity data and organizes it by department, showing FTE values over 24 months.
 */
@Component({
  selector: 'app-dir-mitarbeiter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './dir-mitarbeiter.component.html',
  styleUrls: ['./dir-mitarbeiter.component.scss']
})
export class DirMitarbeiterComponent implements OnInit {
  /** Labels for the next 24 months, used in the table header. */
  monateLabels:     string[]           = [];

  /** Column names: first 'name', then 'month1' through 'month24'. */
  displayedColumns: string[]           = ['name', ...Array.from({ length: 24 }, (_, i) => `monat${i+1}`)];

  /** All department blocks derived from the API data model. */
  abteilungen:      AbteilungsBlock[]  = [];

  /** The currently selected department name for filtering. */
  gewaehlteAbteilung = '';

  constructor(private capacityService: CapacityService) {}

  /**
   * Initializes the component.
   * 1. Generates month labels for the next 24 months.
   * 2. Loads the direct capacity overview data from the service.
   */
  ngOnInit(): void {
    // 1) Generate month labels
    const heute = new Date();
    for (let i = 0; i < 24; i++) {
      const m = new Date(heute.getFullYear(), heute.getMonth() + i, 1);
      this.monateLabels.push(
        m.toLocaleString('de-DE', { month: 'short', year: 'numeric' })
      );
    }

    // 2) Load the direct capacity overview from the service
    const startYear  = heute.getFullYear();
    const startMonth = heute.getMonth() + 1;  // Angular expects 1-12
    this.capacityService
      .getDirectOverview(startYear, startMonth)
      .subscribe(dto => this.buildAbteilungsBlocks(dto));
  }

  /**
   * Transforms the DirectCapacityOverviewDto into our display model:
   * a block for each department with employees and their FTE sums.
   * @param dto The DirectCapacityOverviewDto received from the service.
   */
  private buildAbteilungsBlocks(dto: DirectCapacityOverviewDto): void {
    this.abteilungen = dto.departments.map((dept: DepartmentCapacityOverviewDto) => {
      const subtotal = dept.subtotalFte;
      const total = subtotal.reduce((sum, f) => sum + f, 0);
      return {
        departmentName: dept.departmentName,
        headCount:      dept.headCount,
        subtotalFte:    subtotal,
        totalFte:       total,
        employees:      dept.employees.map((emp: EmployeeCapacityDto) => ({
          name: emp.name,
          fte:  emp.deviations
        }))
      };
    });
  }

  /**
   * Returns only the department blocks that match the selected department.
   * Used in the template with *ngFor.
   */
  get gefilterteAbteilungen(): AbteilungsBlock[] {
    return this.gewaehlteAbteilung
      ? this.abteilungen.filter(b => b.departmentName === this.gewaehlteAbteilung)
      : this.abteilungen;
  }
}
