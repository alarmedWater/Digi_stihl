import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { MitarbeiterService } from '../mitarbeiter/services/mitarbeiter.service';
import { EmployeeDto } from '../mitarbeiter/models/employee';

/**
 * Defines the structure for displaying employee departure information.
 */
interface Austritt {
  name: string;
  abteilung: string;
  austrittsdatum: string;
  austrittsart: string;
}

/**
 * Component responsible for displaying and filtering employee departures.
 * It fetches employee data, identifies departures, and presents them in a user-friendly format.
 */
@Component({
  selector: 'app-austritte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './austritte.component.html',
  styleUrls: ['./austritte.component.scss']
})
export class AustritteComponent implements OnInit {
  /** List of employee departures to be displayed. */
  austritte: Austritt[] = [];
  /** The search term used to filter the list of departures. */
  suchbegriff: string = '';

  constructor(private mitarbeiterService: MitarbeiterService) {}

  /**
   * Initializes the component by fetching employee data,
   * filtering for those with a termination date, and mapping them
   * to the `Austritt` display format.
   */
  ngOnInit(): void {
    this.mitarbeiterService.getMitarbeiter()
      .subscribe({
        next: (list: EmployeeDto[]) => {
          this.austritte = list
            .filter(e => !!e.kuendigung)
            .map(e => ({
              name: `${e.vorname} ${e.name}`,
              abteilung: e.kostenstelle,
              austrittsdatum: e.kuendigung ? this.formatDatum(e.kuendigung) : '',
              austrittsart: e.exitReason?.description ?? ''
            }));
        },
        error: err => console.error('Error loading departures:', err)
      });
  }

  /**
   * Returns a filtered list of employee departures based on the search term.
   * The filter applies to name, departure date, and departure type.
   */
  get gefilterteAustritte(): Austritt[] {
    const begriff = this.suchbegriff.toLowerCase();
    return this.austritte.filter(a =>
      a.name.toLowerCase().includes(begriff) ||
      a.austrittsdatum.includes(begriff) ||
      a.austrittsart.toLowerCase().includes(begriff)
    );
  }

  /**
   * Formats an ISO date string to DD-MM-YYYY format.
   * @param isoString The ISO date string to format.
   * @returns The formatted date string.
   */
  private formatDatum(isoString: string): string {
    const datum = new Date(isoString);
    const tag = datum.getDate().toString().padStart(2, '0');
    const monat = (datum.getMonth() + 1).toString().padStart(2, '0');
    const jahr = datum.getFullYear();
    return `${tag}-${monat}-${jahr}`;
  }
}
