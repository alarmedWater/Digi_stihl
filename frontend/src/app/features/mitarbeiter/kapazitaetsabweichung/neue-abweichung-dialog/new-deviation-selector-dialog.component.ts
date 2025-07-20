import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { EmployeeDto } from '../../models/employee';
import { MitarbeiterService } from '../../services/mitarbeiter.service';

/**
 * Result interface for the NewDeviationSelectorDialogComponent.
 */
export interface NewDeviationSelectorResult {
  /** The ID of the selected employee. */
  employeeId: number;
}

/**
 * Dialog component for selecting an employee to create a new capacity deviation.
 * Allows searching and selecting an employee from a list.
 */
@Component({
  selector: 'app-new-deviation-selector-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './new-deviation-selector-dialog.component.html',
  // Inline styles to avoid external SCSS loader issues in tests
  styles: [
    `
    .full-width {
      width: 100%;
      margin-bottom: 1rem;
    }
    .mat-form-field .mat-form-field-placeholder {
      color: rgba(0, 0, 0, 0.6);
    }
    `
  ]
})
export class NewDeviationSelectorDialogComponent implements OnInit {
  /** The form group for the employee selection. */
  form!: FormGroup;
  /** All employees fetched from the service. */
  allEmployees: EmployeeDto[] = [];
  /** Employees filtered based on the search query. */
  filteredEmployees: EmployeeDto[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewDeviationSelectorDialogComponent, NewDeviationSelectorResult>,
    private mitarbeiterService: MitarbeiterService,
    @Inject(MAT_DIALOG_DATA) public data: { mitarbeiter: EmployeeDto[] }
  ) {}

  /**
   * Initializes the component and sets up the form and employee data loading.
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      search:     ['', Validators.minLength(1)],
      employeeId: [null, Validators.required]
    });

    // Load all employees from the service.
    this.mitarbeiterService.getMitarbeiter().subscribe(list => {
      this.allEmployees = list;
      this.filteredEmployees = [...this.allEmployees];
    });

    // Apply filter by name when search query changes.
    this.form.get('search')!.valueChanges.subscribe(query => {
      const q = (query || '').toLowerCase();
      this.filteredEmployees = this.allEmployees.filter(e =>
        (`${e.vorname} ${e.name}`).toLowerCase().includes(q)
      );
      // Reset selected employee when search query changes.
      this.form.get('employeeId')!.reset(null);
    });
  }

  /**
   * Handles the "Next" action.
   * Closes the dialog with the selected employee ID if the form is valid.
   */
  onNext(): void {
    if (this.form.valid) {
      this.dialogRef.close({ employeeId: this.form.value.employeeId });
    }
  }

  /**
   * Handles the "Cancel" action.
   * Closes the dialog without returning any data.
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
