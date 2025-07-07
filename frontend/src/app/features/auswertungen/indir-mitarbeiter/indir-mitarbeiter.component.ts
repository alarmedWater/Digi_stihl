// src/app/features/mitarbeiter/indir-mitarbeiter/indir-mitarbeiter.component.ts
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

/** Ein einzelner Mitarbeiter mit seinen 24-Monats-FTE-Werten */
interface MitarbeiterEintrag {
  name: string;
  fte:  number[]; // 24 Werte
}

/** Block-Definition pro Abteilung */
interface AbteilungsBlock {
  departmentName: string;
  headCount:      number;
  subtotalFte:    number[]; // 24 Werte
  totalFte:       number;
  employees:      MitarbeiterEintrag[];
}

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
  /** Labels für die nächsten 24 Monate im Header */
  monateLabels:       string[]           = [];
  /** Alle Blöcke nach Abteilung */
  abteilungen:        AbteilungsBlock[]  = [];
  /** Aktuell gewählte Abteilung für Filter */
  ausgewaehlteAbteilung = '';

  constructor(private capacityService: CapacityService) {}

  ngOnInit(): void {
    // Monats-Labels erzeugen
    const heute = new Date();
    for (let i = 0; i < 24; i++) {
      const m = new Date(heute.getFullYear(), heute.getMonth() + i, 1);
      this.monateLabels.push(m.toLocaleString('de-DE', { month: 'short', year: 'numeric' }));
    }

    // Indirekte Übersicht laden
    this.capacityService
      .getIndirectOverview(heute.getFullYear(), heute.getMonth() + 1)
      .subscribe(dto => this.buildAbteilungsBlocks(dto));
  }

  /** Mappt DTO in Abteilungs-Blöcke */
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

  /** Gefilterte Abteilungs-Blöcke gemäß Auswahl */
  get gefilterteAbteilungen(): AbteilungsBlock[] {
    if (!this.ausgewaehlteAbteilung) {
      return this.abteilungen;
    }
    return this.abteilungen.filter(b => b.departmentName === this.ausgewaehlteAbteilung);
  }
}
