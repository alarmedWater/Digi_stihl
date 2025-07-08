// src/app/services/mitarbeiter.service.ts
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import {
  Observable,
  throwError,
  BehaviorSubject
} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

import { EmployeeDto } from '../models/employee';
import { EmployeeFilterDto } from '../models/employee-filter';
import { EmployeeCreateDto } from '../models/employee-create';
import { ExitReasonDto } from '../models/exit-reason';

@Injectable({
  providedIn: 'root'
})
export class MitarbeiterService {
  /** Basis-URL für die Employees-API */
  private readonly baseUrl = `${environment.apiUrl}/Employees`;
  /** Gemeinsame JSON-Header für POST/PUT */
  private readonly jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  /** Subject, das nach jeder Änderung feuert */
  private _refresh$ = new BehaviorSubject<void>(undefined);
  /** Öffentliches Observable zum Abonnieren */
  public readonly refresh$ = this._refresh$.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Liefert alle Mitarbeitenden (optional gefiltert)
   * @param filters DTO mit Filteroptionen
   */
  getMitarbeiter(filters?: EmployeeFilterDto): Observable<EmployeeDto[]> {
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value != null && value !== '') {
          params = params.set(key, String(value));
        }
      });
    }
    return this.http
      .get<EmployeeDto[]>(this.baseUrl, { params })
      .pipe(
        tap(list => console.debug('Fetched Mitarbeitende:', list)),
        catchError(this.handleError)
      );
  }

  /**
   * Holt einen einzelnen Mitarbeitenden nach ID
   * @param id Mitarbeiter-ID
   */
  getMitarbeiterById(id: number): Observable<EmployeeDto> {
    return this.http
      .get<EmployeeDto>(`${this.baseUrl}/${id}`)
      .pipe(
        tap(emp => console.debug(`Fetched Mitarbeiter ${id}:`, emp)),
        catchError(this.handleError)
      );
  }

  /**
   * Legt einen neuen Mitarbeitenden an
   * und feuert anschließend ein Refresh-Signal
   * @param emp Payload für neuen Mitarbeitenden
   */
  createMitarbeiter(emp: EmployeeCreateDto): Observable<EmployeeDto> {
    return this.http
      .post<EmployeeDto>(this.baseUrl, emp, { headers: this.jsonHeaders })
      .pipe(
        tap(created => {
          console.debug('Created Mitarbeiter:', created);
          this._refresh$.next();
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Aktualisiert einen bestehenden Mitarbeitenden
   * und feuert anschließend ein Refresh-Signal
   * @param id ID des zu aktualisierenden Mitarbeitenden
   * @param emp Die neuen Daten
   */
  updateMitarbeiter(id: number, emp: EmployeeDto): Observable<EmployeeDto> {
    return this.http
      .put<EmployeeDto>(`${this.baseUrl}/${id}`, emp, { headers: this.jsonHeaders })
      .pipe(
        tap(updated => {
          console.debug(`Updated Mitarbeiter ${id}:`, updated);
          this._refresh$.next();
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Löscht einen Mitarbeitenden
   * und feuert anschließend ein Refresh-Signal
   * @param id ID des zu löschenden Mitarbeitenden
   */
  deleteMitarbeiter(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        tap(() => {
          console.debug(`Deleted Mitarbeiter ${id}`);
          this._refresh$.next();
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Holt alle Austrittsgründe
   */
  getExitReasons(): Observable<ExitReasonDto[]> {
    return this.http
      .get<ExitReasonDto[]>(`${environment.apiUrl}/ExitReasons`)
      .pipe(
        tap(list => console.debug('Fetched ExitReasons:', list)),
        catchError(this.handleError)
      );
  }

  /**
   * Zentrale Fehlerbehandlung für HTTP-Calls
   * @param error das HTTP-Fehlerobjekt
   */
  private handleError(error: HttpErrorResponse) {
    console.error('API-Error:', error);
    const msg =
      error.error?.detail ||
      error.error?.message ||
      `Server returned code ${error.status}`;
    return throwError(() => new Error(msg));
  }
}
