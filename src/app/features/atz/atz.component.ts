import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // für *ngFor
import { FormsModule } from '@angular/forms';   // für [(ngModel)]

// Ein Interface zur Typisierung der ATZ-Mitarbeiterdaten
interface ATZMitarbeiter {
  name: string;
  abteilung: string;
  austrittsdatum: string;
}

@Component({
  selector: 'app-atz',
  standalone: true, // ⬅️ wichtig für Standalone Component
  imports: [CommonModule, FormsModule], // ⬅️ die zwei benötigten Module
  templateUrl: './atz.component.html',
  styleUrls: ['./atz.component.scss']
})
export class ATZComponent {

  // Dummy-Daten für ATZ-Mitarbeiter
  atzMitarbeiter: ATZMitarbeiter[] = [
    { name: 'Max Müller', abteilung: 'Produktion', austrittsdatum: '31.12.2024' },
    { name: 'Sabine Schmidt', abteilung: 'Logistik', austrittsdatum: '15.03.2025' },
    { name: 'Thomas Becker', abteilung: 'Qualität', austrittsdatum: '01.11.2024' },
    { name: 'Lisa Schneider', abteilung: 'IT', austrittsdatum: '01.01.2023' }
  ];

  // Suchfeld zur Filterung
  suchbegriff: string = '';

  // Gefilterte Ausgabe
  get gefilterteMitarbeiter(): ATZMitarbeiter[] {
    const begriff = this.suchbegriff.toLowerCase();
    return this.atzMitarbeiter.filter(m =>
      m.name.toLowerCase().includes(begriff) ||
      m.abteilung.toLowerCase().includes(begriff) ||
      m.austrittsdatum.includes(begriff)
    );
  }
}
