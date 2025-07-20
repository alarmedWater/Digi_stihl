import { Component, OnInit } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatSelectModule }     from '@angular/material/select';

import {
  IndirectCapacityOverviewDto,
  DepartmentCapacityOverviewDto,
  EmployeeCapacityDto
} from '../../mitarbeiter/models/capacity.dtos';
import { CapacityService } from '../../mitarbeiter/services/capacity.service';

/**
 * Represents an employee entry with their 24-month FTE values.
 */
interface MitarbeiterEintrag {
  name: string;
  fte:  number[]; // 24 values
}

/**
 * Defines a data block for a department in the indirect capacity overview.
 */
interface AbteilungsBlock {
  departmentName: string;
  headCount:      number;
  subtotalFte:    number[]; // 24 values
  totalFte:       number;
  employees:      MitarbeiterEintrag[];
}

/**
 * Component for displaying the indirect employee capacity overview.
 * It fetches capacity data and organizes it by department, showing FTE values over 24 months.
 */
@Component({
  selector: 'app-indir-mitarbeiter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './indir-mitarbeiter.component.html',
  styleUrls: ['./indir-mitarbeiter.component.scss']
})
export class IndirMitarbeiterComponent implements OnInit {
  /**
   * Labels for the next 24 months, used in the table header.
   */
  monateLabels:       string[]           = [];
  /**
   * All department blocks containing employee and FTE data.
   */
  abteilungen:        AbteilungsBlock[]  = [];
  /**
   * The currently selected department for filtering.
   */
  ausgewaehlteAbteilung = '';

  constructor(private capacityService: CapacityService) {}

  /**
   * Initializes the component.
   * Generates month labels and loads indirect capacity overview data.
   */
  ngOnInit(): void {
    // Generate month labels for the next 24 months.
    const heute = new Date();
    for (let i = 0; i < 24; i++) {
      const m = new Date(heute.getFullYear(), heute.getMonth() + i, 1);
      this.monateLabels.push(m.toLocaleString('de-DE', { month: 'short', year: 'numeric' }));
    }

    // Load indirect overview data from the capacity service.
    this.capacityService
      .getIndirectOverview(heute.getFullYear(), heute.getMonth() + 1)
      .subscribe(dto => this.buildAbteilungsBlocks(dto));
  }

  /**
   * Maps the DTO (Data Transfer Object) into department blocks for display.
   * @param dto The IndirectCapacityOverviewDto received from the service.
   */
  private buildAbteilungsBlocks(dto: IndirectCapacityOverviewDto): void {
    this.abteilungen = dto.departments.map((dept: DepartmentCapacityOverviewDto) => {
      const subtotal = dept.subtotalFte;
      const total = subtotal.reduce((sum, f) => sum + f, 0);
      const employees: MitarbeiterEintrag[] = dept.employees.map((emp: EmployeeCapacityDto) => ({
        name: emp.name,
        fte:  emp.deviations
      }));
      return {
        departmentName: dept.departmentName,
        headCount:      dept.headCount,
        subtotalFte:    subtotal,
        totalFte:       total,
        employees:      employees
      };
    });
  }

  /**
   * Returns the filtered department blocks based on the selected department.
   * If no department is selected, all blocks are returned.
   */
  get gefilterteAbteilungen(): AbteilungsBlock[] {
    if (!this.ausgewaehlteAbteilung) {
      return this.abteilungen;
    }
    return this.abteilungen.filter(b => b.departmentName === this.ausgewaehlteAbteilung);
  }
}
