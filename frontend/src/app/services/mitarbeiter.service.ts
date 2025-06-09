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
  providedIn: 'root'
})
export class MitarbeiterService {
  private apiUrl = 'http://localhost:5036/api/employees'; // ggf. Port anpassen

  constructor(private http: HttpClient) {}

  // Alle Mitarbeitenden abrufen
  getMitarbeiter(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Einzelnen Mitarbeiter abrufen
  getMitarbeiterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Neuen Mitarbeiter erstellen
  createMitarbeiter(mitarbeiter: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, mitarbeiter);
  }

  // Mitarbeiter aktualisieren
  updateMitarbeiter(id: number, mitarbeiter: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, mitarbeiter);
  }

  // Mitarbeiter löschen
  deleteMitarbeiter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


