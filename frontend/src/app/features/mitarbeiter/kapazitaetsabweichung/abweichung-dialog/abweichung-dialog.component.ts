// src/app/features/mitarbeiter/kapazitaetsabweichung/abweichung-dialog/abweichung-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }  from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule }  from '@angular/material/datepicker';
import { MatNativeDateModule }  from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { EmployeeDto } from '../../models/employee';

/**
 * Payload, das der aufrufende Component dem Dialog übergibt.
 * - `abweichung` enthält ggf. die zu bearbeitende Abweichung
 * - `mitarbeiter` ist die Liste aller Mitarbeiter für das Dropdown
 */
export interface AbweichungDialogData {
  abweichung?: AbweichungData;
  mitarbeiter: EmployeeDto[];
}

/** Struktur der Abweichungsdaten, die zurückgegeben werden */
export interface AbweichungData {
  id?: number;
  employeeId:    number;
  startdatum:    Date;
  enddatum:      Date;
  neueKapazitaet:number;
  bemerkung:     string;
}

@Component({
  selector: 'app-abweichung-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './abweichung-dialog.component.html',
  styleUrls: ['./abweichung-dialog.component.scss'],
})
export class AbweichungDialogComponent implements OnInit {
  /** Reactive-Form für die Abweichung */
  abweichungForm!: FormGroup;

  /** Liste aller Mitarbeiter für das Dropdown */
  mitarbeiterListe: EmployeeDto[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AbweichungDialogComponent, AbweichungData>,
    @Inject(MAT_DIALOG_DATA) public data: AbweichungDialogData
  ) {}

  ngOnInit(): void {
    this.mitarbeiterListe = this.data.mitarbeiter;
    this.abweichungForm = this.fb.group({
      employeeId:     [this.data.abweichung?.employeeId || null, [Validators.required]],
      startdatum:     [this.data.abweichung?.startdatum || null, [Validators.required]],
      enddatum:       [this.data.abweichung?.enddatum   || null, [Validators.required]],
      neueKapazitaet: [this.data.abweichung?.neueKapazitaet || null, [Validators.required, Validators.min(-1), Validators.max(1)]],
      bemerkung:      [this.data.abweichung?.bemerkung   || '']
    });
  }

  /** Schließt den Dialog und liefert die vollständigen Daten zurück, inkl. id */
  onSpeichern(): void {
    if (this.abweichungForm.valid) {
      const formValues = this.abweichungForm.value as Omit<AbweichungData, 'id'>;
      const result: AbweichungData = {
        ...formValues,
        id: this.data.abweichung?.id
      };
      this.dialogRef.close(result);
    }
  }

  /** Schließt den Dialog ohne Rückgabe */
  onAbbrechen(): void {
    this.dialogRef.close();
  }
}
