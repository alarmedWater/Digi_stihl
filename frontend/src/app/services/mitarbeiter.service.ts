/***import { Injectable } from '@angular/core';
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
}***/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Der Service wird global zur Verfügung gestellt
})
export class MitarbeiterService {

  // Hier wird die Basis-URL zur REST-API des Backends definiert.
  // Diese URL wird später abgestimmt.
  private apiUrl = 'http://localhost:3000/api/mitarbeiter'; // Platzhalter

  constructor(private http: HttpClient) {}

  /**
   * Holt die Liste aller Mitarbeitenden vom Backend.
   * Rückgabe: Observable mit Array von Mitarbeiter-Objekten
   */
  getMitarbeiter(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Sendet neue Mitarbeiterdaten an das Backend.
   * Rückgabe: Observable mit dem angelegten Mitarbeiter-Objekt
   */
  addMitarbeiter(mitarbeiter: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, mitarbeiter);
  }

  /**
   * (Optional) Aktualisiert bestehende Mitarbeiterdaten.
   * Wird aktuell noch nicht benötigt, bleibt aber vorbereitet.
   */
  updateMitarbeiter(id: number, mitarbeiterDaten: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, mitarbeiterDaten);
  }
}

