import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kapazitaetsabweichung',
  standalone: true,
  imports: [
    MatTableModule, MatButtonModule,
    MatFormFieldModule, MatSelectModule,
    FormsModule, CommonModule
  ],
  templateUrl: './kapazitaetsabweichung.component.html',
  styleUrls: ['./kapazitaetsabweichung.component.scss']
})
export class KapazitaetsabweichungComponent implements OnInit {

  // Definition der Tabellenspalten
  angezeigteSpalten: string[] = ['mitarbeiter', 'bereich', 'zeitraum', 'geplant', 'tatsaechlich', 'abweichung'];

  // Beispielhafte Daten zur Darstellung von Kapazitätsabweichungen
  kapazitaetsListe = [
    { mitarbeiter: 'Max Mustermann', bereich: 'Produktion', zeitraum: 'März 2025', geplant: 1.0, tatsaechlich: 0.8, abweichung: -0.2 },
    { mitarbeiter: 'Lisa Müller', bereich: 'Vertrieb', zeitraum: 'März 2025', geplant: 1.0, tatsaechlich: 1.1, abweichung: 0.1 },
  ];

  // Gefilterte Liste, standardmäßig gleich der vollständigen Liste
  gefilterteListe = [...this.kapazitaetsListe];

  // Liste verfügbarer Bereiche für den Filter
  bereiche = ['Produktion', 'Vertrieb', 'Verwaltung', 'IT', 'Personal'];

  // Ausgewählter Bereich zum Filtern der Kapazitätsliste
  gewaehlterBereich = '';

  ngOnInit(): void {
    this.filterAnwenden();
  }

  // Anwenden des Filters basierend auf dem ausgewählten Bereich
  filterAnwenden(): void {
    this.gefilterteListe = this.gewaehlterBereich 
      ? this.kapazitaetsListe.filter(item => item.bereich === this.gewaehlterBereich) 
      : this.kapazitaetsListe;
  }

  // Exportiert die gefilterte Liste als CSV-Datei
  exportieren(): void {
    const csvInhalt = this.arrayZuCSV(this.gefilterteListe);
    const blob = new Blob([csvInhalt], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = 'kapazitaetsabweichungen.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  // Konvertiert ein Array von Objekten in CSV-Format
  arrayZuCSV(daten: any[]): string {
    const kopfzeile = Object.keys(daten[0]).join(';');
    const zeilen = daten.map(row => Object.values(row).join(';'));
    return [kopfzeile, ...zeilen].join('\r\n');
  }

}