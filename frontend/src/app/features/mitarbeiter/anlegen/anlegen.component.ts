// anlegen.component.ts
/*import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Import der benötigten Angular- und Material-Module für Formularfunktionen und UI-Komponenten
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-anlegen',
  standalone: true,
  imports: [
    ReactiveFormsModule,    // für reaktive Formulare
    MatInputModule,         // Material Input-Felder
    MatButtonModule,        // Material Buttons
    MatSelectModule,        // Dropdown-Auswahlfelder
    MatDatepickerModule,    // Datumsauswahlfelder
    MatNativeDateModule     // native Datumskompatibilität
  ],
  templateUrl: './anlegen.component.html',
  styleUrls: ['./anlegen.component.scss']
})
export class AnlegenComponent implements OnInit {
  // Definition des Formulars zur Erfassung der Mitarbeiterdaten
  mitarbeiterForm!: FormGroup;

  // Definition der Auswahlmöglichkeiten für den Bereich des Mitarbeiters
  bereiche = ['Produktion', 'Vertrieb', 'Verwaltung', 'IT', 'Personal'];

  // Definition der möglichen Arbeitsverhältnisse für den Mitarbeiter
  arbeitsverhaeltnisse = ['Vollzeit', 'Teilzeit', 'Aushilfe', 'Werkstudent'];

  // Konstruktor mit FormBuilder, um das Formular zu erstellen
  constructor(private fb: FormBuilder) {}

  // Initialisiert das Formular beim Laden der Komponente
  ngOnInit(): void {
    this.mitarbeiterForm = this.fb.group({
      vorname: ['', Validators.required],     // Vorname ist Pflichtfeld
      nachname: ['', Validators.required],    // Nachname ist Pflichtfeld
      eintritt: ['', Validators.required],    // Eintrittsdatum ist Pflichtfeld
      fte: [1, [Validators.required, Validators.min(0.1), Validators.max(1)]], // FTE-Wert zwischen 0.1 und 1
      bereich: ['', Validators.required],     // Bereich ist Pflichtfeld
      kostenstelle: ['', Validators.required],// Kostenstelle ist Pflichtfeld
      funktion: [''],                         // Funktion optional
      arbeitsverhaeltnis: ['', Validators.required], // Arbeitsverhältnis ist Pflichtfeld
      befristung: [''],                       // Befristung optional
      kuendigung: [''],                       // Kündigungsdatum optional
      bemerkung: ['']                         // Bemerkung optional
    });
  }

  // Methode zum Absenden der Formulardaten
  onSubmit(): void {
    if (this.mitarbeiterForm.valid) {  
      console.log('Daten:', this.mitarbeiterForm.value);
      // Hier wird später die Logik hinzugefügt, um die Daten ans Backend zu senden.
    }
  }
} */


// src/app/features/anlegen/anlegen.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MitarbeiterService } from '../../../services/mitarbeiter.service';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-anlegen',
  standalone: true,
  imports: [
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
  bereiche = ['Produktion', 'Vertrieb', 'Verwaltung', 'IT', 'Personal'];
  arbeitsverhaeltnisse = ['Vollzeit', 'Teilzeit', 'Aushilfe', 'Werkstudent'];

  constructor(
    private fb: FormBuilder,
    private mitarbeiterService: MitarbeiterService,
    private snackBar: MatSnackBar
  ) {}
  

  ngOnInit(): void {
    this.mitarbeiterForm = this.fb.group({
      vorname: ['', Validators.required],
      nachname: ['', Validators.required],
      eintritt: ['', Validators.required],
      fte: [1, [Validators.required, Validators.min(0.1), Validators.max(1)]],
      bereich: ['', Validators.required],
      kostenstelle: ['', Validators.required],
      funktion: [''],
      arbeitsverhaeltnis: ['', Validators.required],
      befristung: [''],
      kuendigung: [''],
      bemerkung: ['']
    });
  }

  onSubmit(): void {
    if (this.mitarbeiterForm.valid) {
      const formData = this.mitarbeiterForm.value;
      console.log('Zu sendende Daten:', formData);
  
      this.mitarbeiterService.createMitarbeiter(formData).subscribe({
        next: (response) => {
          console.log('Mitarbeiter erfolgreich erstellt:', response);
  
          // Erfolgsmeldung anzeigen
          this.snackBar.open('Mitarbeiter erfolgreich angelegt!', 'Schließen', {
            duration: 3000
          });
  
          // Formular zurücksetzen
          this.mitarbeiterForm.reset();
        },
        error: (err) => {
          console.error('Fehler beim Erstellen:', err);
  
          // Fehlermeldung anzeigen
          this.snackBar.open('Fehler beim Anlegen des Mitarbeiters!', 'Schließen', {
            duration: 3000
          });
        }
      });
    }
  }
  
}
