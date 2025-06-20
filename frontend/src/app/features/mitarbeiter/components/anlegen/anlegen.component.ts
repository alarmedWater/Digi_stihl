// src/app/features/mitarbeiter/components/anlegen/anlegen.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MitarbeiterService } from '../../services/mitarbeiter.service';
import { EmployeeDto } from '../../models/employee';

@Component({
  selector: 'app-anlegen',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './anlegen.component.html',
  styleUrls: ['./anlegen.component.scss']
})
export class AnlegenComponent implements OnInit {
  mitarbeiterForm!: FormGroup;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';

  // Werte müssen exakt zum DTO passen
  bereiche = ['Direkt', 'Indirekt'];
  arbeitsverhaeltnisse = ['Befristet', 'Unbefristet'];

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
      fte:                [1, [Validators.required, Validators.min(0.1), Validators.max(1)]],
      bereich:            ['', Validators.required],
      kostenstelle:       ['', Validators.required],
      funktion:           [''],
      arbeitsverhaeltnis: ['', Validators.required],
      befristung:         [null],
      kuendigung:         [null],
      bemerkung:          ['']
    });
  }

  onSubmit(): void {
    if (this.mitarbeiterForm.invalid) {
      this.snack.open('Bitte alle Pflichtfelder ausfüllen', 'OK', { duration: 3000 });
      return;
    }

    const f = this.mitarbeiterForm.value;
    const dto: EmployeeDto = {
      name:               f.name,
      vorname:            f.vorname,
      eintritt:           (f.eintritt as Date).toISOString(),
      fte:                f.fte,
      bereich:            f.bereich,
      kostenstelle:       f.kostenstelle,
      funktion:           f.funktion || '',
      arbeitsverhaeltnis: f.arbeitsverhaeltnis,
      befristung:         f.befristung ? (f.befristung as Date).toISOString() : undefined,
      kuendigung:         f.kuendigung ? (f.kuendigung as Date).toISOString() : undefined,
      bemerkung:          f.bemerkung || ''
    };

    this.service.createMitarbeiter(dto).subscribe({
      next: created => {
        this.giveFeedback('success', 'Mitarbeiter erfolgreich angelegt!');
        // Navigation erst, nachdem der Button grün war
        setTimeout(() => this.router.navigate(['/mitarbeiter']), 3000);
      },
      error: err => {
        const msg = err.error?.detail || err.message || 'Unbekannter Fehler';
        this.giveFeedback('error', `Fehler: ${msg}`);
      }
    });
  }

  private giveFeedback(status: 'success' | 'error', message: string) {
    this.submitStatus = status;
    this.snack.open(message, 'OK', {
      duration: 3000,
      panelClass: status === 'error' ? ['snackbar-error'] : undefined
    });
    setTimeout(() => this.submitStatus = 'idle', 3000);
  }
}
