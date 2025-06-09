// src/app/features/austritte/austritte.component.ts

/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';     // Für ngFor, ngIf etc.
import { FormsModule } from '@angular/forms';       // Für [(ngModel)]

@Component({
  selector: 'app-austritte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './austritte.component.html',
  styleUrls: ['./austritte.component.scss']
})
export class AustritteComponent {

  // Dummy-Daten: Liste mit ausgetretenen Mitarbeitenden
  austritte = [
    { name: 'Max Müller', abteilung: 'Produktion', austrittsdatum: '2024-03-31' },
    { name: 'Lisa Schulz', abteilung: 'Logistik', austrittsdatum: '2023-12-15' },
    { name: 'Thomas Becker', abteilung: 'IT', austrittsdatum: '2024-06-30' }
  ];

  // Suchbegriff für Filterung (Name oder Datum)
  suchbegriff: string = '';

  // Gefilterte Liste basierend auf dem eingegebenen Suchbegriff
  get gefilterteAustritte() {
    const begriff = this.suchbegriff.toLowerCase();
    return this.austritte.filter(m =>
      m.name.toLowerCase().includes(begriff) ||
      m.austrittsdatum.includes(begriff)
    );
  }
}*/

// src/app/features/austritte/austritte.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MitarbeiterService } from '../../services/mitarbeiter.service'; 

@Component({
  selector: 'app-austritte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './austritte.component.html',
  styleUrls: ['./austritte.component.scss']
})
export class AustritteComponent implements OnInit {

  constructor(private mitarbeiterService: MitarbeiterService) {}

  // Dummy-Daten: Liste mit ausgetretenen Mitarbeitenden
  austritte = [
    { name: 'Max Müller', abteilung: 'Produktion', austrittsdatum: '2024-03-31' },
    { name: 'Lisa Schulz', abteilung: 'Logistik', austrittsdatum: '2023-12-15' },
    { name: 'Thomas Becker', abteilung: 'IT', austrittsdatum: '2024-06-30' }
  ];

  suchbegriff: string = '';

  get gefilterteAustritte() {
    const begriff = this.suchbegriff.toLowerCase();
    return this.austritte.filter(m =>
      m.name.toLowerCase().includes(begriff) ||
      m.austrittsdatum.includes(begriff)
    );
  }

  ngOnInit(): void {
    this.mitarbeiterService.getMitarbeiter().subscribe((data:any) => {
      console.log('Empfangene Mitarbeiterdaten:', data);
    });
  }
}
