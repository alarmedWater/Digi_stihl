// src/app/features/mitarbeiter/kapazitaetsabweichung/new-deviation-selector-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatSelectModule }    from '@angular/material/select';
import { MatButtonModule }    from '@angular/material/button';

import { EmployeeDto } from '../../models/employee';

export interface NewDeviationSelectorData {
  mitarbeiter: EmployeeDto[];
}

export interface NewDeviationSelectorResult {
  employeeId: number;
}

@Component({
  selector: 'app-new-deviation-selector-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './new-deviation-selector-dialog.component.html',
  styleUrls: ['../r']
})
export class NewDeviationSelectorDialogComponent implements OnInit {
  form!: FormGroup;
  filteredEmployees: EmployeeDto[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewDeviationSelectorDialogComponent, NewDeviationSelectorResult>,
    @Inject(MAT_DIALOG_DATA) public data: NewDeviationSelectorData
  ) {}

  ngOnInit(): void {
    // initialisiere Formular mit Suchfeld und Auswahl
    this.form = this.fb.group({
      search:     ['', Validators.minLength(1)],
      employeeId: [null, Validators.required]
    });
    // Anfangsliste aller Mitarbeiter
    this.filteredEmployees = [...this.data.mitarbeiter];

    // Filter per Name
    this.form.get('search')!.valueChanges.subscribe(query => {
      const q = (query || '').toLowerCase();
      this.filteredEmployees = this.data.mitarbeiter
        .filter(e => `${e.vorname} ${e.name}`.toLowerCase().includes(q));
      // reset Auswahl
      this.form.get('employeeId')!.reset(null);
    });
  }

  onNext(): void {
    this.dialogRef.close({ employeeId: this.form.value.employeeId });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
