import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { forkJoin } from 'rxjs';

import { MitarbeiterService } from '../../services/mitarbeiter.service';
import { DepartmentService }  from '../../services/department.service';
import { EmployeeDto }        from '../../models/employee';
import { ExitReasonDto }      from '../../models/exit-reason';
import { DepartmentDto }      from '../../models/department';

/**
 * Interface extending EmployeeDto to include the department name.
 */
interface EmployeeWithDept extends EmployeeDto {
  abteilungsname?: string;
}

/**
 * Component for editing and managing employees.
 * Displays a filterable list of employees and allows editing each one in a dialog.
 */
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
  /**
   * Columns to be displayed in the employee table.
   */
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
    'exitReason',
    'funktion',
    'bemerkung',
    'abteilungsname',
    'fte',
    'bereich',
    'mengenabhaengig',
    'aktion'
  ];

  /**
   * The complete list of employees with department information.
   */
  mitarbeiterListe: EmployeeWithDept[] = [];
  /**
   * The filtered list of employees currently displayed in the table.
   */
  gefilterteListe: EmployeeWithDept[] = [];
  /**
   * The current value of the filter input field.
   */
  filterWert = '';

  constructor(
    private svc: MitarbeiterService,
    private deptSvc: DepartmentService,
    private dialog: MatDialog
  ) {}

  /**
   * Initializes the component by loading the employee data.
   */
  ngOnInit(): void {
    this.loadMitarbeiter();
  }

  /**
   * Fetches employees and departments concurrently.
   * Maps department names to employees using their cost center ID.
   */
  private loadMitarbeiter(): void {
    forkJoin({
      emps:  this.svc.getMitarbeiter(),
      depts: this.deptSvc.getDepartments()
    }).subscribe(({ emps, depts }) => {
      const deptMap = new Map<string, string>(
        depts.map(d => [d.kostenstelle, d.abteilungsname])
      );
      this.mitarbeiterListe = emps.map(e => ({
        ...e,
        abteilungsname: e.kostenstelle ? deptMap.get(e.kostenstelle) ?? '–' : '–'
      }));
      this.gefilterteListe = [...this.mitarbeiterListe];
    });
  }

  /**
   * Filters the employee list based on the filterWert.
   * The filter is applied to first name, last name, department name, and area.
   */
  applyFilter(): void {
    const v = this.filterWert.trim().toLowerCase();
    this.gefilterteListe = this.mitarbeiterListe.filter(e =>
      e.vorname.toLowerCase().includes(v) ||
      e.name.toLowerCase().includes(v) ||
      (e.abteilungsname?.toLowerCase().includes(v) ?? false) ||
      e.bereich.toLowerCase().includes(v)
    );
  }

  /**
   * Opens the employee editing dialog.
   * @param emp The employee to be edited.
   */
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

/**
 * Dialog component for editing an employee's details.
 */
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
    <mat-dialog-content [formGroup]="form">
      <form class="bearbeiten-form">
        <mat-form-field class="full-width">
          <mat-label>Vorname</mat-label>
          <input matInput formControlName="vorname" />
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Nachname</mat-label>
          <input matInput formControlName="name" />
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Eintritt</mat-label>
          <input matInput type="date" formControlName="eintritt" />
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Arbeitsverhältnis</mat-label>
          <mat-select formControlName="arbeitsverhaeltnis">
            <mat-option value="Befristet">Befristet</mat-option>
            <mat-option value="Unbefristet">Unbefristet</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Befristung Anfang</mat-label>
          <input matInput type="date" formControlName="befristung" />
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Befristung Max</mat-label>
          <input matInput type="date" formControlName="befristungMax" />
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Kostenstelle</mat-label>
          <input matInput formControlName="kostenstelle" />
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Bereich</mat-label>
          <mat-select formControlName="bereich">
            <mat-option value="Direkt">Direkt</mat-option>
            <mat-option value="Indirekt">Indirekt</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>FTE</mat-label>
          <input matInput type="number" formControlName="fte" min="0" max="1" step="0.01" />
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Mengenabhängig</mat-label>
          <mat-select formControlName="mengenabhaengig">
            <mat-option [value]="true">Ja</mat-option>
            <mat-option [value]="false">Nein</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Exit Reason</mat-label>
          <mat-select formControlName="exitReasonId">
            <mat-option *ngFor="let ex of exitReasons" [value]="ex.exitReasonId">
              {{ ex.description }}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Kündigung</mat-label>
          <input matInput type="date" formControlName="kuendigung" />
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Funktion</mat-label>
          <input matInput formControlName="funktion" />
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Freistellung</mat-label>
          <input matInput type="date" formControlName="freistellung" />
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Bemerkung</mat-label>
          <textarea matInput formControlName="bemerkung"></textarea>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end" class="actions">
      <button mat-button (click)="abbrechen()">Abbrechen</button>
      <button mat-flat-button color="primary" (click)="speichern()" [disabled]="form.invalid">
        Speichern
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width { width: 100%; margin-bottom: 1rem; }
    .actions    { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem; }
  `]
})
export class MitarbeiterBearbeitenDialog {
  /**
   * The form group for editing employee data.
   */
  form: FormGroup;
  /**
   * List of available exit reasons for an employee.
   */
  exitReasons: ExitReasonDto[] = [];

  constructor(
    private fb: FormBuilder,
    private svc: MitarbeiterService,
    public dialogRef: MatDialogRef<MitarbeiterBearbeitenDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeDto
  ) {
    this.form = this.fb.group({
      vorname:          [data.vorname, Validators.required],
      name:             [data.name, Validators.required],
      eintritt:         [data.eintritt, Validators.required],
      arbeitsverhaeltnis: [data.arbeitsverhaeltnis, Validators.required],
      befristung:       [data.befristung],
      befristungMax:    [data.befristungMax],
      verlaengerung1:   [data.verlaengerung1],
      verlaengerung2:   [data.verlaengerung2],
      kostenstelle:     [data.kostenstelle, Validators.required],
      bereich:          [data.bereich, Validators.required],
      fte:              [data.fte, [Validators.required, Validators.min(0), Validators.max(1)]],
      mengenabhaengig:  [data.mengenabhaengig, Validators.required],
      exitReasonId:     [data.exitReasonId],
      kuendigung:       [data.kuendigung],
      funktion:         [data.funktion],
      freistellung:     [data.freistellung],
      bemerkung:        [data.bemerkung]
    });

    this.svc.getExitReasons().subscribe({ next: list => this.exitReasons = list, error: () => this.exitReasons = [] });
  }

  /**
   * Saves the changes made to the employee.
   * If the form is valid, it sends the updated data to the service and closes the dialog.
   */
  speichern(): void {
    if (this.form.invalid) return;
    const updateDto: EmployeeDto = { ...this.data, ...this.form.value };
    this.svc.updateMitarbeiter(updateDto.employeeId!, updateDto).subscribe({ next: () => this.dialogRef.close(true), error: err => console.error('Update failed', err) });
  }

  /**
   * Closes the dialog without saving any changes.
   */
  abbrechen(): void { this.dialogRef.close(false); }
}
