// src/app/features/services/department.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

import { DepartmentDto } from '../models/department';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private readonly url = `${environment.apiUrl}/Departments`;

  constructor(private http: HttpClient) {}

  /** Liest alle Departments aus */
  getDepartments(): Observable<DepartmentDto[]> {
    return this.http.get<DepartmentDto[]>(this.url).pipe(
      tap(list => console.debug('Fetched Departments:', list)),
      catchError(this.handleError)
    );
  }

  /** Liest einen einzelnen Department per Kostenstelle aus */
  getDepartment(kostenstelle: string): Observable<DepartmentDto> {
    return this.http.get<DepartmentDto>(`${this.url}/${kostenstelle}`).pipe(
      tap(dept => console.debug(`Fetched Department ${kostenstelle}:`, dept)),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    console.error('Department API error', err);
    return throwError(() => new Error(err.message || 'Server error'));
  }
}
