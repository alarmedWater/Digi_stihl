// src/app/features/mitarbeiter/components/fluktuation/fluktuation.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MitarbeiterService } from '../mitarbeiter/services/mitarbeiter.service';
import { EmployeeDto } from '../mitarbeiter/models/employee';

interface FluktuationsEintrag {
  monat: string;
  jahr: number;
  agKuendigungen: number;
  anKuendigungen: number;
  sonstigeKuendigungen: number;
  gesamtmitarbeiter: number;
  fluktuationsrate: number;
}

@Component({
  selector: 'app-fluktuation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fluktuation.component.html',
  styleUrls: ['./fluktuation.component.scss']
})
export class FluktuationComponent implements OnInit {
  daten: FluktuationsEintrag[] = [];
  ausgewaehlterMonat = '';
  ausgewaehltesJahr: number | null = null;

  constructor(private svc: MitarbeiterService) {}

  ngOnInit(): void {
    this.svc.getMitarbeiter().subscribe({
      next: (list: EmployeeDto[]) => {
        // Gruppiere eingetragene Kündigungen nach Jahr-Monat
        const map = new Map<string, EmployeeDto[]>();
        list.forEach(emp => {
          if (!emp.kuendigung) return;
          const d = new Date(emp.kuendigung);
          const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
          const arr = map.get(key) || [];
          arr.push(emp);
          map.set(key, arr);
        });

        // Erzeuge Einträge aus Gruppen
        this.daten = Array.from(map.entries()).map(([key, emps]) => {
          const [year, month] = key.split('-').map(Number);
          const monthName = new Date(year, month - 1)
            .toLocaleString('default', { month: 'long' });
          const ag = emps.filter(e => e.exitReasonId === 2).length;
          const an = emps.filter(e => e.exitReasonId === 1).length;
          const other = emps.length - ag - an;

          // Gesamt MA zum Monatsende berechnen
          const cutoff = new Date(year, month, 0);
          const total = list.filter(e => {
            const start = new Date(e.eintritt);
            const end = e.kuendigung ? new Date(e.kuendigung) : null;
            return start <= cutoff && (!end || end > cutoff);
          }).length;

          const rate = total > 0 ? ((ag + an + other) / total) * 100 : 0;
          return {
            monat: monthName,
            jahr: year,
            agKuendigungen: ag,
            anKuendigungen: an,
            sonstigeKuendigungen: other,
            gesamtmitarbeiter: total,
            fluktuationsrate: parseFloat(rate.toFixed(2))
          };
        })
        // Sortiere chronologisch nach Jahr und Monat
        .sort((a, b) =>
          a.jahr - b.jahr ||
          new Date(`${a.jahr}-${a.monat}-01`).getMonth() -
          new Date(`${b.jahr}-${b.monat}-01`).getMonth()
        );

        // Setze Standardjahr
        if (this.daten.length) {
          this.ausgewaehltesJahr = this.daten[0].jahr;
        }
      },
      error: (err: any) => console.error('Fehler beim Laden der Mitarbeiter:', err)
    });
  }

  get gefilterteDaten(): FluktuationsEintrag[] {
    return this.daten.filter(e =>
      (this.ausgewaehltesJahr == null || e.jahr === this.ausgewaehltesJahr) &&
      (this.ausgewaehlterMonat === '' || e.monat === this.ausgewaehlterMonat)
    );
  }

  get verfuegbareMonate(): string[] {
    return [...new Set(this.daten.map(e => e.monat))];
  }

  get verfuegbareJahre(): number[] {
    return [...new Set(this.daten.map(e => e.jahr))];
  }
}
