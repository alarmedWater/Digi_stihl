/*import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AbweichungDialogComponent, AbweichungData, Mitarbeiter } from './abweichung-dialog/abweichung-dialog.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; // für [(ngModel)]
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-kapazitaetsabweichung',
  standalone: true,
  templateUrl: './kapazitaetsabweichung.component.html',
  styleUrls: ['./kapazitaetsabweichung.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class KapazitaetsabweichungComponent implements OnInit {

  // Gesamtübersicht aller gespeicherten Abweichungen
  abweichungen: (AbweichungData & { name: string })[] = [];

  // Gefilterte Liste zur Anzeige in der Tabelle
  gefilterteAbweichungen: (AbweichungData & { name: string })[] = [];

  // Textfeld für Live-Filterung
  filterText: string = '';

  // Spalten in der Tabelle
  displayedColumns: string[] = ['name', 'zeitraum', 'kapazitaet', 'bemerkung', 'aktion'];

  // Beispielhafte Mitarbeitendenliste – später vom Backend laden
  mitarbeiterListe: Mitarbeiter[] = [
    { id: 1, vorname: 'Max', nachname: 'Müller' },
    { id: 2, vorname: 'Lisa', nachname: 'Schmidt' },
    { id: 3, vorname: 'Ali', nachname: 'Yılmaz' },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.applyFilter(); // Initialfilter bei Start (wenn Daten vorhanden)
  }

  // Neue Abweichung erfassen
  neueAbweichung(): void {
    const dialogRef = this.dialog.open(AbweichungDialogComponent, {
      width: '500px',
      data: {
        mitarbeiter: this.mitarbeiterListe
      }
    });

    dialogRef.afterClosed().subscribe((result: AbweichungData) => {
      if (result) {
        const name = this.getNameById(result.employeeId);
        this.abweichungen.push({ ...result, name });
        this.applyFilter();
      }
    });
  }

  // Abweichung bearbeiten
  bearbeiten(abweichung: AbweichungData & { name: string }): void {
    const dialogRef = this.dialog.open(AbweichungDialogComponent, {
      width: '500px',
      data: {
        abweichung,
        mitarbeiter: this.mitarbeiterListe
      }
    });

    dialogRef.afterClosed().subscribe((result: AbweichungData) => {
      if (result) {
        const index = this.abweichungen.indexOf(abweichung);
        const name = this.getNameById(result.employeeId);
        if (index !== -1) {
          this.abweichungen[index] = { ...result, name };
          this.applyFilter();
        }
      }
    });
  }

  // Abweichung löschen
  loeschen(abweichung: AbweichungData & { name: string }): void {
    const index = this.abweichungen.indexOf(abweichung);
    if (index !== -1) {
      this.abweichungen.splice(index, 1);
      this.applyFilter();
    }
  }

  // Filtert nach Name oder Bemerkung
  applyFilter(): void {
    const ft = this.filterText.trim().toLowerCase();
    this.gefilterteAbweichungen = this.abweichungen.filter(a =>
      a.name.toLowerCase().includes(ft) ||
      a.bemerkung?.toLowerCase().includes(ft)
    );
  }

  // Ermittelt vollständigen Namen anhand der ID
  private getNameById(id: number): string {
    const mitarbeiter = this.mitarbeiterListe.find(m => m.id === id);
    return mitarbeiter ? `${mitarbeiter.vorname} ${mitarbeiter.nachname}` : 'Unbekannt';
  }

  // Exportiert Tabelle als CSV-Datei
  exportieren(): void {
    const csvRows = [
      ['Name', 'Startdatum', 'Enddatum', 'Neue Kapazität', 'Bemerkung'],
      ...this.gefilterteAbweichungen.map(a => [
        a.name,
        a.startdatum.toLocaleDateString(),
        a.enddatum.toLocaleDateString(),
        a.neueKapazitaet.toString(),
        a.bemerkung || ''
      ])
    ];

    const csvContent = csvRows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kapazitaetsabweichungen.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}*/

import { Component, OnInit } from '@angular/core'; 
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AbweichungDialogComponent, AbweichungData, Mitarbeiter } from './abweichung-dialog/abweichung-dialog.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MitarbeiterService } from '../../../services/mitarbeiter.service'; // <-- NEU

@Component({
  selector: 'app-kapazitaetsabweichung',
  standalone: true,
  templateUrl: './kapazitaetsabweichung.component.html',
  styleUrls: ['./kapazitaetsabweichung.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class KapazitaetsabweichungComponent implements OnInit {
  abweichungen: (AbweichungData & { name: string })[] = [];
  gefilterteAbweichungen: (AbweichungData & { name: string })[] = [];
  filterText: string = '';
  displayedColumns: string[] = ['name', 'zeitraum', 'kapazitaet', 'bemerkung', 'aktion'];

  // Wird nun dynamisch per API geladen
  mitarbeiterListe: Mitarbeiter[] = [];

  constructor(
    private dialog: MatDialog,
    private mitarbeiterService: MitarbeiterService // <-- Injected
  ) {}

  ngOnInit(): void {
    this.ladeMitarbeitende(); // <-- NEU
    this.applyFilter(); // Initialfilter
  }

  // Mitarbeitende vom Backend laden
  ladeMitarbeitende(): void {
    this.mitarbeiterService.getMitarbeiter().subscribe({
      next: (daten: Mitarbeiter[]) => {
        this.mitarbeiterListe = daten;
      },
      error: (err) => {
        console.error('Fehler beim Laden der Mitarbeitenden:', err);
      }
    });
  }

  neueAbweichung(): void {
    const dialogRef = this.dialog.open(AbweichungDialogComponent, {
      width: '500px',
      data: {
        mitarbeiter: this.mitarbeiterListe
      }
    });

    dialogRef.afterClosed().subscribe((result: AbweichungData) => {
      if (result) {
        const name = this.getNameById(result.employeeId);
        this.abweichungen.push({ ...result, name });
        this.applyFilter();
      }
    });
  }

  bearbeiten(abweichung: AbweichungData & { name: string }): void {
    const dialogRef = this.dialog.open(AbweichungDialogComponent, {
      width: '500px',
      data: {
        abweichung,
        mitarbeiter: this.mitarbeiterListe
      }
    });

    dialogRef.afterClosed().subscribe((result: AbweichungData) => {
      if (result) {
        const index = this.abweichungen.indexOf(abweichung);
        const name = this.getNameById(result.employeeId);
        if (index !== -1) {
          this.abweichungen[index] = { ...result, name };
          this.applyFilter();
        }
      }
    });
  }

  loeschen(abweichung: AbweichungData & { name: string }): void {
    const index = this.abweichungen.indexOf(abweichung);
    if (index !== -1) {
      this.abweichungen.splice(index, 1);
      this.applyFilter();
    }
  }

  applyFilter(): void {
    const ft = this.filterText.trim().toLowerCase();
    this.gefilterteAbweichungen = this.abweichungen.filter(a =>
      a.name.toLowerCase().includes(ft) ||
      a.bemerkung?.toLowerCase().includes(ft)
    );
  }

  private getNameById(id: number): string {
    const mitarbeiter = this.mitarbeiterListe.find(m => m.id === id);
    return mitarbeiter ? `${mitarbeiter.vorname} ${mitarbeiter.nachname}` : 'Unbekannt';
  }

  exportieren(): void {
    const csvRows = [
      ['Name', 'Startdatum', 'Enddatum', 'Neue Kapazität', 'Bemerkung'],
      ...this.gefilterteAbweichungen.map(a => [
        a.name,
        a.startdatum.toLocaleDateString(),
        a.enddatum.toLocaleDateString(),
        a.neueKapazitaet.toString(),
        a.bemerkung || ''
      ])
    ];

    const csvContent = csvRows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kapazitaetsabweichungen.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
