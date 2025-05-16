import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // für ngFor, ngIf usw.
import { FormsModule } from '@angular/forms';   // für ngModel

// Definition eines Interfaces für die Struktur der Befristeten-Daten
interface BefristeterMitarbeiter {
  name: string;
  abteilung: string;
  beschaeftigungsart: string;
  befristetBis: string;
}

@Component({
  selector: 'app-befristung',
  standalone: true, // Standalone-Komponente
  imports: [CommonModule, FormsModule],
  templateUrl: './befristung.component.html',
  styleUrls: ['./befristung.component.scss']
})
export class BefristungComponent {
  // Liste mit Dummy-Daten
  befristeteMitarbeiter: BefristeterMitarbeiter[] = [
    { name: 'Anna Weber', abteilung: 'Marketing', beschaeftigungsart: 'Teilzeit', befristetBis: '2025-06-30' },
    { name: 'Peter Neumann', abteilung: 'IT', beschaeftigungsart: 'Vollzeit', befristetBis: '2024-12-31' },
    { name: 'Julia König', abteilung: 'Vertrieb', beschaeftigungsart: 'Werkstudent', befristetBis: '2025-03-15' },
    { name: 'Lars Meier', abteilung: 'HR', beschaeftigungsart: 'Aushilfe', befristetBis: '2025-09-01' }
  ];

  // Suchbegriff für Filterfunktion
  suchbegriff: string = '';

  // Filterfunktion: gibt nur die Einträge zurück, die zum Suchbegriff passen
  get gefilterteBefristete(): BefristeterMitarbeiter[] {
    const begriff = this.suchbegriff.toLowerCase();
    return this.befristeteMitarbeiter.filter(m =>
      m.name.toLowerCase().includes(begriff) ||
      m.abteilung.toLowerCase().includes(begriff) ||
      m.beschaeftigungsart.toLowerCase().includes(begriff) ||
      m.befristetBis.includes(begriff)
    );
  }
}
