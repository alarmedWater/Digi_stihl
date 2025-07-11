import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription, switchMap, startWith } from 'rxjs';
import { MitarbeiterService } from '../mitarbeiter/services/mitarbeiter.service';
import { EmployeeDto } from '../mitarbeiter/models/employee';

/**
 * Represents a single entry in the fluctuation report.
 */
interface FluktuationsEintrag {
  /** The month name (e.g., "Januar"). */
  monat: string;
  /** The year. */
  jahr: number;
  /** Number of terminations by employer. */
  agKuendigungen: number;
  /** Number of terminations by employee. */
  anKuendigungen: number;
  /** Number of other types of terminations. */
  sonstigeKuendigungen: number;
  /** Total number of employees at the end of the month. */
  gesamtmitarbeiter: number;
  /** Fluctuation rate in percentage, rounded to 2 decimal places. */
  fluktuationsrate: number;
}

/**
 * Component for displaying employee fluctuation data.
 * It calculates and presents termination statistics and fluctuation rates over time.
 */
@Component({
  selector: 'app-fluktuation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fluktuation.component.html',
  styleUrls: ['./fluktuation.component.scss']
})
export class FluktuationComponent implements OnInit, OnDestroy {
  /** The processed fluctuation data for display. */
  daten: FluktuationsEintrag[] = [];
  /** The currently selected month for filtering. */
  ausgewaehlterMonat = '';
  /** The currently selected year for filtering. */
  ausgewaehltesJahr: number | null = null;

  private sub?: Subscription;

  constructor(private svc: MitarbeiterService) {}

  /**
   * Initializes the component.
   * Subscribes to employee data changes to recalculate fluctuation data.
   */
  ngOnInit(): void {
    // Recalculate whenever employee data changes (create/update/delete).
    this.sub = this.svc.refresh$
      .pipe(
        startWith<void>(undefined),
        switchMap(() => this.svc.getMitarbeiter())
      )
      .subscribe({
        next: emps => this.buildFluktuation(emps),
        error: err => console.error('Failed to load fluctuation data', err)
      });
  }

  /**
   * Cleans up the subscription when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  /**
   * Parses an ISO date string to a local Date object, ignoring time zone offset.
   * @param iso The ISO date string (e.g., "2025-06-16T...").
   * @returns A Date object representing the local date.
   */
  private parseLocalDate(iso: string): Date {
    const [y, m, d] = iso.split('T')[0].split('-').map(n => +n);
    return new Date(y, m - 1, d);
  }

  /**
   * Builds the fluctuation data model from the raw employee data.
   * Groups terminations by month and calculates fluctuation rates.
   * @param allEmps An array of all employee DTOs.
   */
  private buildFluktuation(allEmps: EmployeeDto[]): void {
    // 1) Group terminations by year-month (without time offset!).
    const map = new Map<string, EmployeeDto[]>();
    for (const e of allEmps) {
      if (!e.kuendigung) continue;
      const dd = this.parseLocalDate(e.kuendigung);
      const key = `${dd.getFullYear()}-${dd.getMonth() + 1}`;
      const arr = map.get(key) || [];
      arr.push(e);
      map.set(key, arr);
    }

    // 2) Determine the timeline from the earliest termination to 12 months into the future.
    const now = new Date();
    const futureEnd = new Date(now.getFullYear(), now.getMonth() + 12, 1);
    const earliestDate = Array.from(map.keys())
      .map(k => {
        const [y, m] = k.split('-').map(Number);
        return new Date(y, m - 1, 1);
      })
      .sort((a, b) => a.getTime() - b.getTime())[0]
      ?? new Date(now.getFullYear(), now.getMonth(), 1);

    const timeline: { jahr: number; monat: number; name: string }[] = [];
    let cursor = new Date(earliestDate);
    while (cursor <= futureEnd) {
      timeline.push({
        jahr: cursor.getFullYear(),
        monat: cursor.getMonth() + 1,
        name: cursor.toLocaleString('de-DE', { month: 'long' })
      });
      cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
    }

    // 3) Generate data points for each month in the timeline.
    this.daten = timeline.map(({ jahr, monat, name }) => {
      const key = `${jahr}-${monat}`;
      const group = map.get(key) || [];

      const ag = group.filter(e => e.exitReasonId === 2).length;  // Employer terminations
      const an = group.filter(e => e.exitReasonId === 1).length;  // Employee terminations
      
      // Other terminations: all that are NOT 1 or 2.
      const other = group.filter(e => e.exitReasonId !== 1 && e.exitReasonId !== 2).length;

      // Total employees at month end.
      const cutoff = new Date(jahr, monat, 0); // Last day of the month.
      const total = allEmps.filter(e => {
        const start = this.parseLocalDate(e.eintritt);
        const end = e.kuendigung ? this.parseLocalDate(e.kuendigung) : null;
        return start <= cutoff && (!end || end > cutoff);
      }).length;

      const rate = total > 0 ? ((ag + an + other) / total) * 100 : 0;
      return {
        monat: name,
        jahr,
        agKuendigungen: ag,
        anKuendigungen: an,
        sonstigeKuendigungen: other,
        gesamtmitarbeiter: total,
        fluktuationsrate: parseFloat(rate.toFixed(2))
      };
    });

    // 4) Set default year if data is available.
    if (this.daten.length) {
      this.ausgewaehltesJahr = this.daten[0].jahr;
    }
  }

  /**
   * Returns the filtered fluctuation data based on the selected year and month.
   * @returns An array of FluktuationsEintrag objects.
   */
  get gefilterteDaten(): FluktuationsEintrag[] {
    return this.daten.filter(e =>
      (this.ausgewaehltesJahr == null || e.jahr === this.ausgewaehltesJahr) &&
      (this.ausgewaehlterMonat === '' || e.monat === this.ausgewaehlterMonat)
    );
  }

  /**
   * Returns a list of available months from the fluctuation data for dropdown selection.
   * @returns An array of unique month names.
   */
  get verfuegbareMonate(): string[] {
    return Array.from(new Set(this.daten.map(e => e.monat)));
  }

  /**
   * Returns a sorted list of available years from the fluctuation data for dropdown selection.
   * @returns An array of unique years, sorted in descending order.
   */
  get verfuegbareJahre(): number[] {
    const jahre = Array.from(new Set(this.daten.map(e => e.jahr)));
    return jahre.sort((a, b) => b - a);
  }
}
