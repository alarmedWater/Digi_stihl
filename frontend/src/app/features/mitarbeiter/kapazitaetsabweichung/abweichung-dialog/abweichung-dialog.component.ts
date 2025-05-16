import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'; // MatDialogModule hinzugefügt
import { CommonModule, NgIf, NgFor } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

// Interface zur Strukturierung der Abweichungsdaten
export interface AbweichungData {
  id?: number;
  employeeId: number;
  startdatum: Date;
  enddatum: Date;
  neueKapazitaet: number;
  bemerkung: string;
}

// Interface für die Mitarbeitenden im Auswahlfeld
export interface Mitarbeiter {
  id: number;
  vorname: string;
  nachname: string;
}

@Component({
  selector: 'app-abweichung-dialog',
  standalone: true,
  templateUrl: './abweichung-dialog.component.html',
  styleUrls: ['./abweichung-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,   // ✅ Wichtig für <mat-dialog-actions>
    NgIf,
    NgFor
  ]
})
export class AbweichungDialogComponent implements OnInit {

  // Formular zur Bearbeitung oder Erfassung einer Abweichung
  abweichungForm!: FormGroup;

  // Liste von Mitarbeitenden zur Anzeige im Dropdown
  mitarbeiterListe: Mitarbeiter[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AbweichungDialogComponent>,

    // Injectierte Daten enthalten ggf. eine bestehende Abweichung sowie die Liste der Mitarbeitenden
    @Inject(MAT_DIALOG_DATA)
    public data: { abweichung?: AbweichungData, mitarbeiter: Mitarbeiter[] }
  ) {}

  ngOnInit(): void {
    // Mitarbeitendenliste aus den übergebenen Dialogdaten setzen
    this.mitarbeiterListe = this.data.mitarbeiter;

    // Formular initialisieren – entweder mit vorhandenen Werten oder leeren Feldern
    this.abweichungForm = this.fb.group({
      employeeId: [this.data.abweichung?.employeeId || '', Validators.required],
      startdatum: [this.data.abweichung?.startdatum || '', Validators.required],
      enddatum: [this.data.abweichung?.enddatum || '', Validators.required],
      neueKapazitaet: [
        this.data.abweichung?.neueKapazitaet || '',
        [Validators.required, Validators.min(-1), Validators.max(1)]
      ],
      bemerkung: [this.data.abweichung?.bemerkung || '']
    });
  }

  // Speichert die Abweichung und schließt den Dialog
  onSpeichern(): void {
    if (this.abweichungForm.valid) {
      this.dialogRef.close(this.abweichungForm.value);
    }
  }

  // Schließt den Dialog ohne Änderungen zu übernehmen
  onAbbrechen(): void {
    this.dialogRef.close();
  }
}