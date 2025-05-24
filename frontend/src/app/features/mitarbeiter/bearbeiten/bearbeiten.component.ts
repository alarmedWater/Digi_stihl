// bearbeiten.component.ts
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { EmployeeService } from '../../../services/employee.service';
import { EmployeeDto } from '../../models/employee';
import { MitarbeiterBearbeitenDialog } from '../bearbeiten/bearbeiten-dialog.components'


@Component({
  selector: 'app-bearbeiten',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './bearbeiten.component.html',
  styleUrls: ['./bearbeiten.component.scss'],
})
export class BearbeitenComponent implements OnInit {
  displayedColumns = ['vorname', 'nachname', 'kostenstelle', 'bereich', 'eintritt', 'aktion'];
  mitarbeiterListe: EmployeeDto[] = [];
  gefilterteListe:   EmployeeDto[] = [];
  filterWert = '';

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadMitarbeiter();
  }

  loadMitarbeiter(): void {
    this.employeeService.getEmployees().subscribe(list => {
      this.mitarbeiterListe = list;
      this.gefilterteListe   = list;
    });
  }

  applyFilter(): void {
    const filter = this.filterWert.trim().toLowerCase();
    this.gefilterteListe = this.mitarbeiterListe.filter(emp =>
      emp.vorname.toLowerCase().includes(filter) ||
      emp.name.toLowerCase().includes(filter) ||
      emp.bereich.toLowerCase().includes(filter)
    );
  }

  bearbeiten(emp: EmployeeDto): void {
    const dialogRef = this.dialog.open(MitarbeiterBearbeitenDialog, {
      width: '400px',
      data: emp
    });

    dialogRef.afterClosed().subscribe(updated => {
      if (updated) {
        this.loadMitarbeiter();
      }
    });
  }
}
