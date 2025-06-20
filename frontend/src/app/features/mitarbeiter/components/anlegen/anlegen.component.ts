// src/app/features/mitarbeiter/components/anlegen/anlegen.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Material Modules:
import { MatFormFieldModule }   from '@angular/material/form-field';
import { MatInputModule }       from '@angular/material/input';
import { MatButtonModule }      from '@angular/material/button';
import { MatSelectModule }      from '@angular/material/select';
import { MatDatepickerModule }  from '@angular/material/datepicker';
import { MatNativeDateModule }  from '@angular/material/core';
import { MatCheckboxModule }    from '@angular/material/checkbox';
import { MatIconModule }        from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { MitarbeiterService } from '../../services/mitarbeiter.service';
import { EmployeeCreateDto }  from '../../models/employee-create';
import { ExitReasonDto }      from '../../models/exit-reason';

@Component({
  selector: 'app-anlegen',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // ganz wichtig:
    MatFormFieldModule,
    MatIconModule,

    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,

    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './anlegen.component.html',
  styleUrls: ['./anlegen.component.scss']
})

export class AnlegenComponent implements OnInit {
  mitarbeiterForm!: FormGroup;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';

  bereiche = ['Direkt', 'Indirekt'];
  arbeitsverhaeltnisse = ['Befristet', 'Unbefristet'];
  exitReasons: ExitReasonDto[] = [];

  constructor(
    private fb: FormBuilder,
    private service: MitarbeiterService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.mitarbeiterForm = this.fb.group({
      vorname:            ['', Validators.required],
      name:               ['', Validators.required],
      eintritt:           [null, Validators.required],
      fte:                [1, [ Validators.required, Validators.min(0.1), Validators.max(1) ]],
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

    this.service.getExitReasons().subscribe({
      next: list => this.exitReasons = list,
      error: () => {
        this.exitReasons = [
          { exitReasonId: 1, reason: 'AN_Kuendigung',  description: 'Eigenkündigung' },
          { exitReasonId: 2, reason: 'AG_Kuendigung',  description: 'Kündigung durch Arbeitgeber' },
          { exitReasonId: 3, reason: 'Altersteilzeit', description: 'Eintritt in ATZ' },
          { exitReasonId: 4, reason: 'Ruhestand',     description: 'Ruhestand' },
          { exitReasonId: 5, reason: 'Probezeitende',  description: 'Ende der Probezeit' }
        ];
      }
    });
  }

  onSubmit(): void {
    if (this.mitarbeiterForm.invalid) {
      this.snack.open('Bitte alle Pflichtfelder ausfüllen', 'OK', { duration: 3000 });
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
        this.giveFeedback('success', '✔ Erfolgreich angelegt');
        setTimeout(() => this.router.navigate(['/mitarbeiter']), 3000);
      },
      error: err => {
        const msg = err.error?.detail || err.message || 'Unbekannter Fehler';
        this.giveFeedback('error', `✖ ${msg}`);
      }
    });
  }

  private giveFeedback(status: 'success'|'error', message: string) {
    this.submitStatus = status;
    this.snack.open(message, 'OK', {
      duration: 3000,
      panelClass: status === 'error' ? ['snackbar-error'] : undefined
    });
    setTimeout(() => this.submitStatus = 'idle', 3000);
  }
}
