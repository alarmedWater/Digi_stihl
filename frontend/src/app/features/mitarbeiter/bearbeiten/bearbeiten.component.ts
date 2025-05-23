//bearbeiten.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MitarbeiterService } from '../../../services/mitarbeiter.service';
import { CommonModule } from '@angular/common';

// Interface zur Typisierung der Mitarbeiter-Daten
interface Mitarbeiter {
  id: number;
  vorname: string;
  nachname: string;
  kostenstelle: string;
  bereich: string;
  eintritt: string;
}

// Hauptkomponente für die Bearbeitung der Mitarbeiterdaten
@Component({
  selector: 'app-bearbeiten',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './bearbeiten.component.html',
  styleUrls: ['./bearbeiten.component.scss'],
})
export class BearbeitenComponent implements OnInit {
  displayedColumns: string[] = ['vorname', 'nachname', 'kostenstelle', 'bereich', 'eintritt', 'aktion'];

  mitarbeiterListe: Mitarbeiter[] = [];
  gefilterteListe: Mitarbeiter[] = [];

  filterWert: string = '';

  constructor(
    private mitarbeiterService: MitarbeiterService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadMitarbeiter();
  }

  // Mitarbeiterdaten vom Server laden
  loadMitarbeiter(): void {
    this.mitarbeiterService.getMitarbeiter().subscribe((daten: Mitarbeiter[]) => {
      this.mitarbeiterListe = daten;
      this.gefilterteListe = daten;
    });
  }

  // Filterfunktion zur Suche innerhalb der Mitarbeiterliste
  applyFilter(): void {
    const filterValue = this.filterWert.trim().toLowerCase();
    this.gefilterteListe = this.mitarbeiterListe.filter(
      (mitarbeiter: Mitarbeiter) =>
        mitarbeiter.vorname.toLowerCase().includes(filterValue) ||
        mitarbeiter.nachname.toLowerCase().includes(filterValue) ||
        mitarbeiter.bereich.toLowerCase().includes(filterValue)
    );
  }

  // Öffnet Dialogfenster zur Bearbeitung der Mitarbeiterdaten
  bearbeiten(mitarbeiter: Mitarbeiter): void {
    const dialogRef = this.dialog.open(MitarbeiterBearbeitenDialog, {
      width: 'auto',
      height: 'auto',
      data: mitarbeiter,
      panelClass: 'custom-dialog-container' // Eigene CSS-Klasse für geradlinige Ränder
    });

    // Aktualisiert Mitarbeiterliste nach Schließen des Dialogs, falls Änderungen vorgenommen wurden
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMitarbeiter();
      }
    });
  }
}

// Dialogkomponente zur Bearbeitung eines einzelnen Mitarbeiters
@Component({
  selector: 'mitarbeiter-bearbeiten-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2>Mitarbeiter bearbeiten</h2>
    <form [formGroup]="mitarbeiterForm">
      <mat-form-field>
        <input matInput placeholder="Vorname" formControlName="vorname">
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Nachname" formControlName="nachname">
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Kostenstelle" formControlName="kostenstelle">
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Bereich" formControlName="bereich">
      </mat-form-field>
      <mat-form-field>
        <input matInput type="date" placeholder="Eintritt" formControlName="eintritt">
      </mat-form-field>
      <div class="actions">
        <button mat-button (click)="abbrechen()">Abbrechen</button>
        <button mat-button color="primary" (click)="speichern()">Speichern</button>
      </div>
    </form>
  `,
})
export class MitarbeiterBearbeitenDialog {
  mitarbeiterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mitarbeiterService: MitarbeiterService,
    public dialogRef: MatDialogRef<MitarbeiterBearbeitenDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Mitarbeiter
  ) {
    // Initialisierung des Formulars mit übergebenen Mitarbeiterdaten
    this.mitarbeiterForm = this.fb.group({
      id: [data.id],
      vorname: [data.vorname, Validators.required],
      nachname: [data.nachname, Validators.required],
      kostenstelle: [data.kostenstelle, Validators.required],
      bereich: [data.bereich, Validators.required],
      eintritt: [data.eintritt, Validators.required],
    });
  }

  // Speichert die geänderten Mitarbeiterdaten
  speichern(): void {
    if (this.mitarbeiterForm.valid) {
      const mitarbeiterDaten: Mitarbeiter = this.mitarbeiterForm.value;
      this.mitarbeiterService.updateMitarbeiter(mitarbeiterDaten.id, mitarbeiterDaten).subscribe({
        next: () => this.dialogRef.close(true),
        error: (error: any) => console.error('Fehler beim Speichern:', error),
      });
    }
  }

  // Schließt den Dialog ohne Änderungen
  abbrechen(): void {
    this.dialogRef.close(false);
  }
}
