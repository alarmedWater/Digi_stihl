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
 * Payload passed to the AbweichungDialogComponent.
 * - `abweichung` (optional) contains the deviation data to be edited.
 * - `mitarbeiter` is the list of all employees for the dropdown selection.
 */
export interface AbweichungDialogData {
  abweichung?: AbweichungData;
  mitarbeiter: EmployeeDto[];
}

/**
 * Structure of the deviation data returned by the dialog.
 */
export interface AbweichungData {
  /** Optional: The ID of the capacity deviation. Present if editing an existing deviation. */
  id?: number;
  /** The ID of the employee associated with the deviation. */
  employeeId:    number;
  /** The start date of the deviation. */
  startdatum:    Date;
  /** The end date of the deviation. */
  enddatum:      Date;
  /** The new capacity value for the employee during the deviation period. */
  neueKapazitaet:number;
  /** Remarks or notes about the deviation. */
  bemerkung:     string;
}

/**
 * Dialog component for creating or editing a capacity deviation.
 * Provides a form to input deviation details and select an employee.
 */
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
  /** The reactive form group for the capacity deviation. */
  abweichungForm!: FormGroup;

  /** The list of all employees available for selection in the dropdown. */
  mitarbeiterListe: EmployeeDto[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AbweichungDialogComponent, AbweichungData>,
    @Inject(MAT_DIALOG_DATA) public data: AbweichungDialogData
  ) {}

  /**
   * Initializes the component.
   * Sets up the employee list and initializes the form with existing data if provided.
   */
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

  /**
   * Handles the save action.
   * Closes the dialog and returns the complete deviation data, including the ID if editing.
   */
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

  /**
   * Handles the cancel action.
   * Closes the dialog without returning any data.
   */
  onAbbrechen(): void {
    this.dialogRef.close();
  }
}
