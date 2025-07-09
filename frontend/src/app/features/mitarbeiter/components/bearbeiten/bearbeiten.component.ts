// src/app/features/mitarbeiter/components/bearbeiten/bearbeiten.component.ts

import { Component, OnInit, Inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatTableModule }        from '@angular/material/table';
import { MatFormFieldModule }    from '@angular/material/form-field';
import { MatInputModule }        from '@angular/material/input';
import { MatButtonModule }       from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { MatSelectModule }       from '@angular/material/select';

import { forkJoin } from 'rxjs';

import { MitarbeiterService } from '../../services/mitarbeiter.service';
import { DepartmentService }  from '../../services/department.service';
import { EmployeeDto }        from '../../models/employee';
import { ExitReasonDto }      from '../../models/exit-reason';
import { DepartmentDto }      from '../../models/department';

interface EmployeeWithDept extends EmployeeDto {
  abteilungsname?: string;
}

@Component({
  selector: 'app-bearbeiten',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './bearbeiten.component.html',
  styleUrls: ['./bearbeiten.component.scss'],
})
export class BearbeitenComponent implements OnInit {
  displayedColumns = [
    'employeeId',
    'vorname',
    'name',
    'eintritt',
    'arbeitsverhaeltnis',
    'befristung',
    'befristungMax',
    'verlaengerung1',
    'verlaengerung2',
    'freistellung',
    'kuendigung',
    'exitReasonId',
    'austrittsart',
    'funktion',
    'bemerkung',
    'abteilungsname',  // neu
    'fte',
    'bereich',
    'mengenabhaengig',
    'aktion'
  ];

  mitarbeiterListe: EmployeeWithDept[] = [];
  gefilterteListe:  EmployeeWithDept[] = [];
  filterWert = '';

  constructor(
    private svc: MitarbeiterService,
    private deptSvc: DepartmentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadMitarbeiter();
  }

  private loadMitarbeiter(): void {
    forkJoin({
      emps:  this.svc.getMitarbeiter(),
      depts: this.deptSvc.getDepartments()
    }).subscribe(({ emps, depts }) => {
      // Map Kostenstelle → Abteilungsname
      const deptMap = new Map<string,string>(
        depts.map(d => [d.kostenstelle, d.abteilungsname])
      );
      // Mitarbeiter erweitern
      this.mitarbeiterListe = emps.map(e => ({
        ...e,
        abteilungsname: e.kostenstelle ? deptMap.get(e.kostenstelle) : undefined
      }));
      this.gefilterteListe = [...this.mitarbeiterListe];
    });
  }

  applyFilter(): void {
    const v = this.filterWert.trim().toLowerCase();
    this.gefilterteListe = this.mitarbeiterListe.filter(e =>
      e.vorname.toLowerCase().includes(v) ||
      e.name.toLowerCase().includes(v) ||
      (e.abteilungsname?.toLowerCase().includes(v) ?? false) ||
      e.bereich.toLowerCase().includes(v)
    );
  }

  bearbeiten(emp: EmployeeWithDept): void {
    const ref = this.dialog.open(MitarbeiterBearbeitenDialog, {
      width: '700px',
      data: emp
    });
    ref.afterClosed().subscribe(changed => {
      if (changed) this.loadMitarbeiter();
    });
  }
}


@Component({
  selector: 'mitarbeiter-bearbeiten-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ],
  template: `
    <h2 mat-dialog-title>Mitarbeiter bearbeiten</h2>
    <mat-dialog-content [formGroup]="f">
      <form class="bearbeiten-form">

        <!-- Persönliche Daten -->
        <mat-form-field class="full-width">
          <mat-label>Vorname</mat-label>
          <input matInput formControlName="vorname">
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Nachname</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>

        <!-- Eintritt & Arbeitsverhältnis -->
        <mat-form-field class="full-width">
          <mat-label>Eintritt</mat-label>
          <input matInput type="date" formControlName="eintritt">
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Arbeitsverhältnis</mat-label>
          <mat-select formControlName="arbeitsverhaeltnis">
            <mat-option value="Befristet">Befristet</mat-option>
            <mat-option value="Unbefristet">Unbefristet</mat-option>
          </mat-select>
        </mat-form-field>

        <!-- Befristungen & Verlängerungen -->
        <mat-form-field class="full-width">
          <mat-label>Befristung Anfang</mat-label>
          <input matInput type="date" formControlName="befristung">
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Befristung Max</mat-label>
          <input matInput type="date" formControlName="befristungMax">
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Verlängerung 1</mat-label>
          <input matInput type="date" formControlName="verlaengerung1">
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Verlängerung 2</mat-label>
          <input matInput type="date" formControlName="verlaengerung2">
        </mat-form-field>

        <!-- Organisatorisches -->
        <mat-form-field class="full-width">
          <mat-label>Kostenstelle</mat-label>
          <input matInput formControlName="kostenstelle">
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Bereich</mat-label>
          <mat-select formControlName="bereich">
            <mat-option value="Direkt">Direkt</mat-option>
            <mat-option value="Indirekt">Indirekt</mat-option>
          </mat-select>
        </mat-form-field>

        <!-- Arbeitsumfang -->
        <mat-form-field class="full-width">
          <mat-label>FTE</mat-label>
          <input matInput type="number" formControlName="fte" min="0" max="1" step="0.01">
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Mengenabhängig</mat-label>
          <mat-select formControlName="mengenabhaengig">
            <mat-option [value]="true">Ja</mat-option>
            <mat-option [value]="false">Nein</mat-option>
          </mat-select>
        </mat-form-field>

        <!-- Austritt & Grund -->
        <mat-form-field class="full-width">
          <mat-label>Exit Reason</mat-label>
          <mat-select formControlName="exitReasonId">
            <mat-option *ngFor="let ex of exitReasons" [value]="ex.exitReasonId">
              {{ ex.reason }} – {{ ex.description }}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Kündigung</mat-label>
          <input matInput type="date" formControlName="kuendigung">
        </mat-form-field>

        <!-- Sonstiges -->
        <mat-form-field class="full-width">
          <mat-label>Funktion</mat-label>
          <input matInput formControlName="funktion">
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Freistellung</mat-label>
          <input matInput type="date" formControlName="freistellung">
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Bemerkung</mat-label>
          <textarea matInput formControlName="bemerkung"></textarea>
        </mat-form-field>

      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end" class="actions">
      <button mat-button (click)="abbrechen()">Abbrechen</button>
      <button mat-flat-button color="primary" (click)="speichern()" [disabled]="f.invalid">
        Speichern
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width { width: 100%; margin-bottom: 1rem; }
    .actions   { display:flex; justify-content:flex-end; gap:1rem; margin-top:1rem; }
  `]
})
export class MitarbeiterBearbeitenDialog {
  f: FormGroup;
  exitReasons: ExitReasonDto[] = [];

  constructor(
    private fb: FormBuilder,
    private svc: MitarbeiterService,
    public dialogRef: MatDialogRef<MitarbeiterBearbeitenDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeDto
  ) {
    this.f = this.fb.group({
      vorname:         [data.vorname, Validators.required],
      name:            [data.name, Validators.required],
      eintritt:        [data.eintritt, Validators.required],
      arbeitsverhaeltnis: [data.arbeitsverhaeltnis, Validators.required],
      befristung:      [data.befristung],
      befristungMax:   [data.befristungMax],
      verlaengerung1:  [data.verlaengerung1],
      verlaengerung2:  [data.verlaengerung2],
      kostenstelle:    [data.kostenstelle, Validators.required],
      bereich:         [data.bereich, Validators.required],
      fte:             [data.fte, [Validators.required, Validators.min(0), Validators.max(1)]],
      mengenabhaengig: [data.mengenabhaengig, Validators.required],
      exitReasonId:    [data.exitReasonId],
      kuendigung:      [data.kuendigung],
      funktion:        [data.funktion],
      freistellung:    [data.freistellung],
      bemerkung:       [data.bemerkung]
    });

    this.svc.getExitReasons().subscribe({
      next: list => this.exitReasons = list,
      error: () => this.exitReasons = []
    });
  }

  speichern(): void {
    if (this.f.invalid) return;
    const updateDto: EmployeeDto = { ...this.data, ...this.f.value };
    this.svc.updateMitarbeiter(updateDto.employeeId!, updateDto).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => console.error('Update-Fehler', err)
    });
  }

  abbrechen(): void {
    this.dialogRef.close(false);
  }
}
