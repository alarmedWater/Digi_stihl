import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   // für ngModel

// Interface zur Typisierung der Personalentwicklungsdaten pro Monat
interface PersonalentwicklungsEintrag {
  jahr: number;
  monat: string;
  direkte: number;
  indirekte: number;
  ohneAzubis: number;
  sonstige: number;
  gesamt: number;
}

@Component({
  selector: 'app-personalentwicklung',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personalentwicklung.component.html',
  styleUrls: ['./personalentwicklung.component.scss']
})
export class PersonalentwicklungComponent {

  // Dummy-Daten zur Personalentwicklung über mehrere Monate hinweg
  daten: PersonalentwicklungsEintrag[] = [
    {
      jahr: 2025,
      monat: 'Januar',
      direkte: 12,
      indirekte: 5,
      ohneAzubis: 17,
      sonstige: 2,
      gesamt: 19
    },
    {
      jahr: 2025,
      monat: 'Februar',
      direkte: 13,
      indirekte: 6,
      ohneAzubis: 19,
      sonstige: 1,
      gesamt: 20
    },
    {
      jahr: 2025,
      monat: 'März',
      direkte: 11,
      indirekte: 6,
      ohneAzubis: 17,
      sonstige: 2,
      gesamt: 19
    }
    // Weitere Monate können hier ergänzt werden
  ];
}
