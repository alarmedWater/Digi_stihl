// src/app/services/mitarbeiter.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

import { EmployeeDto }       from '../models/employee';
import { EmployeeFilterDto } from '../models/employee-filter';

@Injectable({
  providedIn: 'root'
})
export class MitarbeiterService {
  // Achte auf Groß-/Kleinschreibung: Controller heißt "Employees"
  private readonly baseUrl = `${environment.apiUrl}/Employees`;

  // Optional: gemeinsame Header für POST/PUT
  private readonly jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  /** Alle Mitarbeitenden holen, optional gefiltert */
  getMitarbeiter(filters?: EmployeeFilterDto): Observable<EmployeeDto[]> {
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value != null && value !== '') {
          params = params.set(key, String(value));
        }
      });
    }
    return this.http.get<EmployeeDto[]>(this.baseUrl, { params })
      .pipe(
        tap(list => console.debug('Fetched Mitarbeitende:', list)),
        catchError(this.handleError)
      );
  }

  /** Einzelnen Mitarbeitenden nach ID holen */
  getMitarbeiterById(id: number): Observable<EmployeeDto> {
    return this.http.get<EmployeeDto>(`${this.baseUrl}/${id}`)
      .pipe(
        tap(emp => console.debug(`Fetched Mitarbeiter ${id}:`, emp)),
        catchError(this.handleError)
      );
  }

  /** Neuen Mitarbeitenden anlegen */
  createMitarbeiter(emp: EmployeeDto): Observable<EmployeeDto> {
    return this.http.post<EmployeeDto>(
        this.baseUrl,
        emp,
        { headers: this.jsonHeaders }
      )
      .pipe(
        tap(created => console.debug('Created Mitarbeiter:', created)),
        catchError(this.handleError)
      );
  }

  /** Bestehenden Mitarbeitenden aktualisieren */
  updateMitarbeiter(id: number, emp: EmployeeDto): Observable<EmployeeDto> {
    return this.http.put<EmployeeDto>(
        `${this.baseUrl}/${id}`,
        emp,
        { headers: this.jsonHeaders }
      )
      .pipe(
        tap(updated => console.debug(`Updated Mitarbeiter ${id}:`, updated)),
        catchError(this.handleError)
      );
  }

  /** Mitarbeitenden löschen */
  deleteMitarbeiter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        tap(() => console.debug(`Deleted Mitarbeiter ${id}`)),
        catchError(this.handleError)
      );
  }

  /** Gemeinsame Error-Handling-Funktion */
  private handleError(error: HttpErrorResponse) {
    console.error('API-Error:', error);
    // Hier könntest Du je nach Status u.a. ui-Snackbar triggern
    return throwError(() => 
      error.error?.detail 
        ? new Error(error.error.detail) 
        : new Error('Unerwarteter Server-Fehler')
    );
  }
}
