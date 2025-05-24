// bearbeiten-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule }    from '@angular/material/form-field';
import { MatInputModule }        from '@angular/material/input';
import { MatButtonModule }       from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule }          from '@angular/common';

import { EmployeeService } from '../../../services/employee.service';
import { EmployeeDto }     from '../../models/employee'

@Component({
  selector: 'app-mitarbeiter-bearbeiten-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule
  ],
  template: `
    <h2>Mitarbeiter bearbeiten</h2>
    <form [formGroup]="mitarbeiterForm">
      <mat-form-field appearance="fill">
        <mat-label>Vorname</mat-label>
        <input matInput formControlName="vorname" />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Nachname</mat-label>
        <input matInput formControlName="name" />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Kostenstelle</mat-label>
        <input matInput formControlName="kostenstelle" />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Bereich</mat-label>
        <input matInput formControlName="bereich" />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Eintritt</mat-label>
        <input matInput type="date" formControlName="eintritt" />
      </mat-form-field>
      <div class="actions">
        <button mat-button (click)="abbrechen()">Abbrechen</button>
        <button mat-button color="primary"
                (click)="speichern()"
                [disabled]="mitarbeiterForm.invalid">
          Speichern
        </button>
      </div>
    </form>
  `,
  styles: [`
    .actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem; }
  `]
})
export class MitarbeiterBearbeitenDialog {
  mitarbeiterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    public dialogRef: MatDialogRef<MitarbeiterBearbeitenDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeDto
  ) {
    this.mitarbeiterForm = this.fb.group({
      employeeId:   [data.employeeId],
      vorname:      [data.vorname, Validators.required],
      name:         [data.name,     Validators.required],
      kostenstelle: [data.kostenstelle, Validators.required],
      bereich:      [data.bereich,  Validators.required],
      eintritt:     [data.eintritt, Validators.required]
    });
  }

  speichern(): void {
    if (this.mitarbeiterForm.valid) {
      const updated: EmployeeDto = this.mitarbeiterForm.value;
      this.service.updateEmployee(updated.employeeId!, updated).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error('Update error', err)
      });
    }
  }

  abbrechen(): void {
    this.dialogRef.close(false);
  }
}
