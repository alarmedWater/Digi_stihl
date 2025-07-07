// src/app/features/mitarbeiter/dir-mitarbeiter/dir-mitarbeiter.component.ts
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
 * Ein einzelner Mitarbeiter mit seinen 24-Monats-FTE-Werten.
 */
interface MitarbeiterEintrag {
  name: string;
  fte:  number[];  // 24 Werte
}

/**
 * Block-Definition pro Abteilung:
 * - Name der Abteilung
 * - Anzahl Köpfe in der Abteilung
 * - Zwischensumme FTE pro Monat
 * - Gesamtsumme FTE über 24 Monate
 * - Liste der einzelnen Mitarbeitereinträge
 */
interface AbteilungsBlock {
  departmentName: string;
  headCount:      number;
  subtotalFte:    number[];          // 24 Werte
  totalFte:       number;            // Summe aller subtotalFte
  employees:      MitarbeiterEintrag[];
}

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
  /** Beschriftungen für die nächsten 24 Monate im Header */
  monateLabels:     string[]           = [];

  /** Spaltennamen: zuerst Name, dann monat1…monat24 */
  displayedColumns: string[]           = ['name', ...Array.from({ length: 24 }, (_, i) => `monat${i+1}`)];

  /** Alle Abteilungsblöcke aus dem API-Datenmodell */
  abteilungen:      AbteilungsBlock[]  = [];

  /** Gefilterter Name der gewählten Abteilung */
  gewaehlteAbteilung = '';

  constructor(private capacityService: CapacityService) {}

  ngOnInit(): void {
    // 1) Erzeuge Monats-Labels
    const heute = new Date();
    for (let i = 0; i < 24; i++) {
      const m = new Date(heute.getFullYear(), heute.getMonth() + i, 1);
      this.monateLabels.push(
        m.toLocaleString('de-DE', { month: 'short', year: 'numeric' })
      );
    }

    // 2) Lade die direkte Kapazitätsübersicht vom Service
    const startYear  = heute.getFullYear();
    const startMonth = heute.getMonth() + 1;  // Angular erwartet 1–12
    this.capacityService
      .getDirectOverview(startYear, startMonth)
      .subscribe(dto => this.buildAbteilungsBlocks(dto));
  }

  /**
   * Wandelt das DirectCapacityOverviewDto in unser Anzeigenmodell um:
   * für jede Abteilung einen Block mit Mitarbeitern und Summen.
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
   * Liefert nur die Abteilungsblöcke, die zur gewählten Abteilung passen.
   * Wird im Template über *ngFor genutzt.
   */
  get gefilterteAbteilungen(): AbteilungsBlock[] {
    return this.gewaehlteAbteilung
      ? this.abteilungen.filter(b => b.departmentName === this.gewaehlteAbteilung)
      : this.abteilungen;
  }
}
