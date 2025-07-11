import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { MitarbeiterService } from '../mitarbeiter/services/mitarbeiter.service';
import { EmployeeDto }        from '../mitarbeiter/models/employee';

interface MonthEntry {
  /** z.B. „Jan 25“ */
  label: string;
  /** letzter Tag des Monats als Cut-off für die Berechnung */
  cutoff: Date;
}

@Component({
  selector: 'app-personalentwicklung',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personalentwicklung.component.html',
  styleUrls: ['./personalentwicklung.component.scss']
})
export class PersonalentwicklungComponent implements OnInit {
  /** die nächsten 12 Monate ab jetzt */
  timeline: MonthEntry[] = [];
  /** 4 Zeilen, jede mit 12 Werten */
  directRow:            number[] = [];
  indirectRow:          number[] = [];
  ohneAzubisRow:        number[] = [];
  gesamtRow:            number[] = [];

  constructor(private svc: MitarbeiterService) {}

  ngOnInit(): void {
    this.buildTimeline();
    this.svc.getMitarbeiter().subscribe(emps => this.buildRows(emps));
  }

  /** Nächste 12 Monate erzeugen */
  private buildTimeline() {
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const cutoff = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      this.timeline.push({
        label: d.toLocaleString('de-DE', { month: 'short', year: '2-digit' }),
        cutoff
      });
    }
  }

  /** Vier Daten-Zeilen füllen */
  private buildRows(emps: EmployeeDto[]) {
    this.directRow    = this.timeline.map(m => this.sumBereich(emps, m.cutoff, 'Direkt'));
    this.indirectRow  = this.timeline.map(m => this.sumBereich(emps, m.cutoff, 'Indirekt'));
    this.ohneAzubisRow= this.timeline.map((_, idx) => this.directRow[idx] + this.indirectRow[idx]);
    // falls Du später noch weitere Gruppen hast, würdest Du sie hier addieren.
    this.gesamtRow    = [...this.ohneAzubisRow];
  }

  /**
   * Sammelt alle FTE eines Bereichs, die am Cut-off-Tag aktiv sind.
   * @param emps alle MA
   * @param cutoff letzter Tag des Monats
   * @param bereich 'Direkt' oder 'Indirekt'
   */
  private sumBereich(emps: EmployeeDto[], cutoff: Date, bereich: 'Direkt' | 'Indirekt'): number {
    return emps
      .filter(e =>
        e.bereich === bereich &&
        new Date(e.eintritt)    <= cutoff &&
        (!e.kuendigung || new Date(e.kuendigung) > cutoff)
      )
      .reduce((sum, e) => sum + e.fte, 0);
  }
}
