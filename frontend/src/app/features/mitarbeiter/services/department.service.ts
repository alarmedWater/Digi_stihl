import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

import { DepartmentDto } from '../models/department';

/**
 * Service for managing department-related operations.
 * Provides methods to fetch department data from the API.
 */
@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private readonly url = `${environment.apiUrl}/Departments`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all departments from the API.
   * @returns An Observable that emits an array of DepartmentDto objects.
   */
  getDepartments(): Observable<DepartmentDto[]> {
    return this.http.get<DepartmentDto[]>(this.url).pipe(
      tap(list => console.debug('Fetched Departments:', list)),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a single department by its cost center ID.
   * @param kostenstelle The cost center ID of the department to retrieve.
   * @returns An Observable that emits a DepartmentDto object.
   */
  getDepartment(kostenstelle: string): Observable<DepartmentDto> {
    return this.http.get<DepartmentDto>(`${this.url}/${kostenstelle}`).pipe(
      tap(dept => console.debug(`Fetched Department ${kostenstelle}:`, dept)),
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors from API calls.
   * @param err The HttpErrorResponse object.
   * @returns An Observable that emits an error.
   */
  private handleError(err: HttpErrorResponse) {
    console.error('Department API error', err);
    return throwError(() => new Error(err.message || 'Server error'));
  }
}
