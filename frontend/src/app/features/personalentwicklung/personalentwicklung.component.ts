import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { MitarbeiterService } from '../mitarbeiter/services/mitarbeiter.service';
import { EmployeeDto }        from '../mitarbeiter/models/employee';

/**
 * Represents an entry in the monthly timeline for capacity planning.
 */
interface MonthEntry {
  /** e.g., "Jan 25" */
  label: string;
  /** Last day of the month, used as a cutoff for calculations. */
  cutoff: Date;
}

/**
 * Component for displaying personnel development data, including FTE calculations over a 12-month timeline.
 */
@Component({
  selector: 'app-personalentwicklung',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personalentwicklung.component.html',
  styleUrls: ['./personalentwicklung.component.scss']
})
export class PersonalentwicklungComponent implements OnInit {
  /** The next 12 months from the current date, used for the timeline. */
  timeline: MonthEntry[] = [];
  /** FTE values for direct employees over 12 months. */
  directRow:            number[] = [];
  /** FTE values for indirect employees over 12 months. */
  indirectRow:          number[] = [];
  /** Combined FTE values for direct and indirect employees (excluding apprentices if applicable) over 12 months. */
  ohneAzubisRow:        number[] = [];
  /** Total FTE values over 12 months. */
  gesamtRow:            number[] = [];

  constructor(private svc: MitarbeiterService) {}

  /**
   * Initializes the component.
   * Builds the 12-month timeline and then fetches employee data to populate the FTE rows.
   */
  ngOnInit(): void {
    this.buildTimeline();
    this.svc.getMitarbeiter().subscribe(emps => this.buildRows(emps));
  }

  /**
   * Builds the timeline for the next 12 months.
   * Each entry includes a formatted label (e.g., "Jan 25") and the last day of the month as a cutoff date.
   */
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

  /**
   * Populates the four data rows (direct, indirect, combined, total) based on employee data.
   * @param emps An array of EmployeeDto objects.
   */
  private buildRows(emps: EmployeeDto[]) {
    this.directRow    = this.timeline.map(m => this.sumBereich(emps, m.cutoff, 'Direkt'));
    this.indirectRow  = this.timeline.map(m => this.sumBereich(emps, m.cutoff, 'Indirekt'));
    this.ohneAzubisRow= this.timeline.map((_, idx) => this.directRow[idx] + this.indirectRow[idx]);
    // If you have additional groups later, you would add them here.
    this.gesamtRow    = [...this.ohneAzubisRow];
  }

  /**
   * Calculates the sum of FTEs for employees within a specific area who are active at the given cutoff date.
   * @param emps All employee DTOs.
   * @param cutoff The last day of the month to consider for activity.
   * @param bereich The area type ('Direkt' or 'Indirekt').
   * @returns The total FTE for the specified area and cutoff date.
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
