import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MitarbeiterService {

  // Mock-Daten
  private mitarbeiterListe = [
    { id: 1, vorname: 'Max', nachname: 'Mustermann', kostenstelle: '1001', bereich: 'IT', eintritt: '2023-01-01' },
    { id: 2, vorname: 'Anna', nachname: 'Schmidt', kostenstelle: '1002', bereich: 'HR', eintritt: '2022-03-15' },
    { id: 3, vorname: 'Peter', nachname: 'Schulz', kostenstelle: '1003', bereich: 'IT', eintritt: '2021-11-30' }
  ];

  constructor() { }

  getMitarbeiter(): Observable<any[]> {
    // Mock-Daten als Observable zurückgeben
    return of(this.mitarbeiterListe);
  }

  updateMitarbeiter(id: number, mitarbeiterDaten: any): Observable<any> {
    const index = this.mitarbeiterListe.findIndex(m => m.id === id);
    if (index !== -1) {
      this.mitarbeiterListe[index] = { ...mitarbeiterDaten };
    }
    return of(this.mitarbeiterListe[index]);
  }
}
