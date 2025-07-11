// src/app/features/befristung/befristung.component.ts
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


interface BefristeterMitarbeiter {
  name: string;
  abteilungsname: string;
  beschaeftigungsart: string;
  befristetBis: string;
}

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
  suchbegriff = '';
  befristeteMitarbeiter: BefristeterMitarbeiter[] = [];
  
  constructor(
    private mitarbeiterService: MitarbeiterService,
    private deptService: DepartmentService
  ) {}

  ngOnInit(): void {
    // Lade zunächst alle Departments und Befristete gleichzeitig
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

  get gefilterteBefristete(): BefristeterMitarbeiter[] {
    const q = this.suchbegriff.trim().toLowerCase();
    return this.befristeteMitarbeiter.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.abteilungsname.toLowerCase().includes(q) ||
      m.beschaeftigungsart.toLowerCase().includes(q) ||
      m.befristetBis.includes(q)
    );
  }

  private formatDatum(iso: string): string {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2,'0');
    const mm = String(d.getMonth()+1).padStart(2,'0');
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  }
}
