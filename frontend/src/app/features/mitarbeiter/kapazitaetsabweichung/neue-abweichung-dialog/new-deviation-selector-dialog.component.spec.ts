// src/app/features/mitarbeiter/kapazitaetsabweichung/new-deviation-selector-dialog.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { EmployeeDto } from '../../models/employee';
import { MitarbeiterService } from '../../services/mitarbeiter.service';

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
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './new-deviation-selector-dialog.component.html',
  styles: [`
    .full-width { width: 100%; margin-bottom: 1rem; }
    .mat-form-field .mat-form-field-placeholder { color: rgba(0, 0, 0, 0.6); }
  `]
})
export class NewDeviationSelectorDialogComponent implements OnInit {
  form!: FormGroup;
  allEmployees: EmployeeDto[] = [];
  filteredEmployees: EmployeeDto[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewDeviationSelectorDialogComponent, NewDeviationSelectorResult>,
    private mitarbeiterService: MitarbeiterService,
    @Inject(MAT_DIALOG_DATA) public data: { mitarbeiter: EmployeeDto[] }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      search: ['', Validators.minLength(1)],
      employeeId: [null, Validators.required]
    });

    // direkt mit gegebener Liste
    this.allEmployees = this.data.mitarbeiter;
    this.filteredEmployees = [...this.allEmployees];

    // Filtert bei Eingabe
    this.form.get('search')!.valueChanges.subscribe(query => {
      const q = (query || '').toLowerCase();
      this.filteredEmployees = this.allEmployees.filter(e =>
        `${e.vorname} ${e.name}`.toLowerCase().includes(q)
      );
      this.form.get('employeeId')!.reset(null);
    });
  }

  onNext(): void {
    if (this.form.valid) {
      this.dialogRef.close({ employeeId: this.form.value.employeeId });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
