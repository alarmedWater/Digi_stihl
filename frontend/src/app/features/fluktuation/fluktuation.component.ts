// src/app/features/mitarbeiter/components/fluktuation/fluktuation.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { FormsModule }     from '@angular/forms';
import { Subscription, switchMap, startWith } from 'rxjs';
import { MitarbeiterService } from '../mitarbeiter/services/mitarbeiter.service';
import { EmployeeDto }       from '../mitarbeiter/models/employee';

interface FluktuationsEintrag {
  monat: string;
  jahr: number;
  agKuendigungen: number;
  anKuendigungen: number;
  sonstigeKuendigungen: number;
  gesamtmitarbeiter: number;
  fluktuationsrate: number; // in Prozent, 2 Nachkommastellen
}

@Component({
  selector: 'app-fluktuation',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './fluktuation.component.html',
  styleUrls: ['./fluktuation.component.scss']
})
export class FluktuationComponent implements OnInit, OnDestroy {
  daten: FluktuationsEintrag[] = [];
  ausgewaehlterMonat = '';
  ausgewaehltesJahr: number | null = null;

  private sub?: Subscription;

  constructor(private svc: MitarbeiterService) {}

  ngOnInit(): void {
    // Immer neu berechnen, wenn Mitarbeiter-Daten sich ändern (create/update/delete)
    this.sub = this.svc.refresh$
      .pipe(
        startWith<void>(undefined),
        switchMap(() => this.svc.getMitarbeiter())
      )
      .subscribe({
        next: emps => this.buildFluktuation(emps),
        error: err => console.error('Fluktuation-Laden fehlgeschlagen', err)
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  /** Parse nur Datumsteil, ohne Zeitzone-Offset */
  private parseLocalDate(iso: string): Date {
    const [y, m, d] = iso.split('T')[0].split('-').map(n => +n);
    return new Date(y, m - 1, d);
  }

  /** Baut das Fluktuations-Datenmodell auf */
  private buildFluktuation(allEmps: EmployeeDto[]): void {
    // 1) Kündigungen nach Jahr-Monat gruppieren (ohne Zeitversatz!)
    const map = new Map<string, EmployeeDto[]>();
    for (const e of allEmps) {
      if (!e.kuendigung) continue;
      const dd = this.parseLocalDate(e.kuendigung);
      const key = `${dd.getFullYear()}-${dd.getMonth() + 1}`;
      const arr = map.get(key) || [];
      arr.push(e);
      map.set(key, arr);
    }

    console.log('Raw Kündigungs-Keys:', Array.from(map.keys()));

    // 2) Zeitraum von frühester Kündigung bis 12 Monate in die Zukunft
    const now = new Date();
    const futureEnd = new Date(now.getFullYear(), now.getMonth() + 12, 1);
    const earliestDate = Array.from(map.keys())
      .map(k => {
        const [y,m] = k.split('-').map(Number);
        return new Date(y, m - 1, 1);
      })
      .sort((a,b) => a.getTime() - b.getTime())[0]
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

      // **LOG 2: generierte Timeline-Schlüssel**
    console.log(
      'Timeline Monate:',
      timeline.map(t => `${t.jahr}-${t.monat}`)
    );

    // 3) Datenpunkte erzeugen
    this.daten = timeline.map(({ jahr, monat, name }) => {
      const key = `${jahr}-${monat}`;
      const group = map.get(key) || [];
      const ag    = group.filter(e => e.exitReasonId === 2).length;
      const an    = group.filter(e => e.exitReasonId === 1).length;
      const other = group.length - ag - an;

      // Gesamt-MA zum Monatsende
      const cutoff = new Date(jahr, monat, 0); // letzter Tag im Monat
      const total = allEmps.filter(e => {
        const start = this.parseLocalDate(e.eintritt);
        const end   = e.kuendigung ? this.parseLocalDate(e.kuendigung) : null;
        return start <= cutoff && (!end || end > cutoff);
      }).length;

      const rate = total > 0 ? ((ag + an + other) / total) * 100 : 0;
      return {
        monat: name,
        jahr,
        agKuendigungen:       ag,
        anKuendigungen:       an,
        sonstigeKuendigungen: other,
        gesamtmitarbeiter:    total,
        fluktuationsrate:     parseFloat(rate.toFixed(2))
      };
    });

    // **LOG 3: finales daten-Array**
    console.log('Fluktuations-Daten:', this.daten);

    // 4) Standard-Jahr voreinstellen
    if (this.daten.length) {
      this.ausgewaehltesJahr = this.daten[0].jahr;
    }
  }

  /** Für die Tabelle: Filter nach Jahr und Monat */
  get gefilterteDaten(): FluktuationsEintrag[] {
    return this.daten.filter(e =>
      (this.ausgewaehltesJahr == null || e.jahr === this.ausgewaehltesJahr) &&
      (this.ausgewaehlterMonat === '' || e.monat === this.ausgewaehlterMonat)
    );
  }

  /** Dropdown-Listen */
  get verfuegbareMonate(): string[] {
    return Array.from(new Set(this.daten.map(e => e.monat)));
  }
  get verfuegbareJahre(): number[] {
    const jahre = Array.from(new Set(this.daten.map(e => e.jahr)));
    return jahre.sort((a, b) => b - a);
  }
}
