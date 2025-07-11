import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Material Modules
import { MatFormFieldModule }   from '@angular/material/form-field';
import { MatInputModule }       from '@angular/material/input';
import { MatButtonModule }      from '@angular/material/button';
import { MatSelectModule }      from '@angular/material/select';
import { MatDatepickerModule }  from '@angular/material/datepicker';
import { MatNativeDateModule }  from '@angular/material/core';
import { MatCheckboxModule }    from '@angular/material/checkbox';
import { MatIconModule }        from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MitarbeiterService } from '../../services/mitarbeiter.service';
import { EmployeeCreateDto }  from '../../models/employee-create';
import { ExitReasonDto }      from '../../models/exit-reason';

/**
 * Component for creating new employee records.
 * Provides a form to input employee details and submit them to the backend.
 */
@Component({
  selector: 'app-anlegen',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './anlegen.component.html',
  styleUrls: ['./anlegen.component.scss']
})
export class AnlegenComponent implements OnInit {
  /** The form group for the new employee data. */
  mitarbeiterForm!: FormGroup;
  /** Status of the form submission, used for feedback. */
  submitStatus: 'idle' | 'success' | 'error' = 'idle';

  /** Available employment areas (e.g., Direct, Indirect). */
  bereiche = ['Direkt', 'Indirekt'];
  /** Available employment relationship types (e.g., Fixed-term, Permanent). */
  arbeitsverhaeltnisse = ['Befristet', 'Unbefristet'];
  /** List of possible exit reasons, fetched from the backend. */
  exitReasons: ExitReasonDto[] = [];

  constructor(
    private fb: FormBuilder,
    private service: MitarbeiterService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  /**
   * Initializes the component.
   * Sets up the employee creation form with validators and loads exit reasons.
   */
  ngOnInit(): void {
    // Initialize the form with default values and validators.
    this.mitarbeiterForm = this.fb.group({
      vorname:            ['', Validators.required],
      name:               ['', Validators.required],
      eintritt:           [null, Validators.required],
      fte:                [1, [Validators.required, Validators.min(0.1), Validators.max(1)]],
      bereich:            ['', Validators.required],
      arbeitsverhaeltnis: ['', Validators.required],
      kostenstelle:       ['', Validators.required],
      mengenabhaengig:    [false],
      exitReasonId:       [null],
      funktion:           [''],
      befristung:         [null],
      kuendigung:         [null],
      bemerkung:          ['']
    });

    // Load exit reasons from the backend. Fallback to a hardcoded list on error.
    this.service.getExitReasons().subscribe({
      next: list => this.exitReasons = list,
      error: () => {
        console.warn('Exit reasons could not be loaded, using default list.');
        this.exitReasons = [
          { exitReasonId: 1, reason: 'AN_Kuendigung',  description: 'Employee Resignation' },
          { exitReasonId: 2, reason: 'AG_Kuendigung',  description: 'Employer Termination' },
          { exitReasonId: 3, reason: 'Altersteilzeit', description: 'Entry into Partial Retirement' },
          { exitReasonId: 4, reason: 'Ruhestand',     description: 'Retirement' },
          { exitReasonId: 5, reason: 'Probezeitende',  description: 'End of Probation Period' }
        ];
      }
    });
  }

  /**
   * Handles the form submission.
   * Validates the form, constructs the DTO, and sends it to the service to create a new employee.
   * Provides user feedback via snackbar and navigates after successful submission.
   */
  onSubmit(): void {
    if (this.mitarbeiterForm.invalid) {
      this.snack.open('Please fill in all required fields', 'OK', { duration: 3000 });
      return;
    }

    const f = this.mitarbeiterForm.value;
    const dto: EmployeeCreateDto = {
      name:               f.name,
      vorname:            f.vorname,
      eintritt:           (f.eintritt as Date).toISOString(),
      fte:                f.fte,
      bereich:            f.bereich,
      arbeitsverhaeltnis: f.arbeitsverhaeltnis,
      kostenstelle:       f.kostenstelle,
      mengenabhaengig:    f.mengenabhaengig,
      exitReasonId:       f.exitReasonId ?? undefined,
      funktion:           f.funktion || undefined,
      befristung:         f.befristung ? (f.befristung as Date).toISOString() : undefined,
      kuendigung:         f.kuendigung ? (f.kuendigung as Date).toISOString() : undefined,
      bemerkung:          f.bemerkung || undefined
    };

    this.service.createMitarbeiter(dto).subscribe({
      next: () => {
        this.giveFeedback('success', '✔ Employee successfully created!');
        // Navigate back to the employee list after 3 seconds.
        setTimeout(() => this.router.navigate(['/mitarbeiter']), 3000);
      },
      error: err => {
        const msg = err.error?.detail || err.message || 'Unknown error';
        this.giveFeedback('error', `✖ ${msg}`);
      }
    });
  }

  /**
   * Displays a snackbar message to provide feedback to the user.
   * Sets the submit status and clears it after a duration.
   * @param status The type of feedback: 'success' or 'error'.
   * @param message The message to display.
   */
  private giveFeedback(status: 'success'|'error', message: string) {
    this.submitStatus = status;
    this.snack.open(message, 'OK', {
      duration: 3000,
      panelClass: status === 'error' ? ['snackbar-error'] : undefined
    });
    // Reset status after duration.
    setTimeout(() => this.submitStatus = 'idle', 3000);
  }
}
