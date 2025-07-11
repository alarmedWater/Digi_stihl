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

/**
 * Service for managing employee-related operations.
 * Provides methods to interact with the employee API, including CRUD operations and fetching exit reasons.
 */
@Injectable({
  providedIn: 'root'
})
export class MitarbeiterService {
  /** Base URL for the Employees API. */
  private readonly baseUrl = `${environment.apiUrl}/Employees`;
  /** Common JSON headers for POST/PUT requests. */
  private readonly jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  /** Subject that emits a signal after any data modification (create/update/delete) to trigger UI refreshes. */
  private _refresh$ = new BehaviorSubject<void>(undefined);
  /** Public Observable to subscribe to for data refresh notifications. */
  public readonly refresh$ = this._refresh$.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all employees, optionally filtered.
   * @param filters DTO containing filter options.
   * @returns An Observable that emits an array of EmployeeDto objects.
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
        tap(list => console.debug('Fetched employees:', list)),
        catchError(this.handleError)
      );
  }

  /**
   * Retrieves a single employee by ID.
   * @param id The ID of the employee.
   * @returns An Observable that emits an EmployeeDto object.
   */
  getMitarbeiterById(id: number): Observable<EmployeeDto> {
    return this.http
      .get<EmployeeDto>(`${this.baseUrl}/${id}`)
      .pipe(
        tap(emp => console.debug(`Fetched employee ${id}:`, emp)),
        catchError(this.handleError)
      );
  }

  /**
   * Creates a new employee.
   * Emits a refresh signal after successful creation.
   * @param emp Payload for the new employee.
   * @returns An Observable that emits the created EmployeeDto object.
   */
  createMitarbeiter(emp: EmployeeCreateDto): Observable<EmployeeDto> {
    return this.http
      .post<EmployeeDto>(this.baseUrl, emp, { headers: this.jsonHeaders })
      .pipe(
        tap(created => {
          console.debug('Created employee:', created);
          this._refresh$.next();
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Updates an existing employee.
   * Emits a refresh signal after successful update.
   * @param id The ID of the employee to update.
   * @param emp The updated employee data.
   * @returns An Observable that emits the updated EmployeeDto object.
   */
  updateMitarbeiter(id: number, emp: EmployeeDto): Observable<EmployeeDto> {
    return this.http
      .put<EmployeeDto>(`${this.baseUrl}/${id}`, emp, { headers: this.jsonHeaders })
      .pipe(
        tap(updated => {
          console.debug(`Updated employee ${id}:`, updated);
          this._refresh$.next();
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Deletes an employee.
   * Emits a refresh signal after successful deletion.
   * @param id The ID of the employee to delete.
   * @returns An Observable that emits void upon successful deletion.
   */
  deleteMitarbeiter(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        tap(() => {
          console.debug(`Deleted employee ${id}`);
          this._refresh$.next();
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Retrieves all exit reasons.
   * @returns An Observable that emits an array of ExitReasonDto objects.
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
   * Centralized error handling for HTTP calls.
   * Logs the error and throws a new error with a user-friendly message.
   * @param error The HTTP error object.
   * @returns An Observable that emits an error.
   */
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    const msg =
      error.error?.detail ||
      error.error?.message ||
      `Server returned code ${error.status}`;
    return throwError(() => new Error(msg));
  }
}
