// src/app/services/employee.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { EmployeeDto } from '../features/models/employee'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly baseUrl = `${environment.apiUrl}/employees`;

  constructor(private readonly http: HttpClient) {}

  /** Alle Mitarbeitenden holen */
  getEmployees(): Observable<EmployeeDto[]> {
    return this.http
      .get<EmployeeDto[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  /** Einzelnen Mitarbeitenden nach ID holen */
  getEmployeeById(id: number): Observable<EmployeeDto> {
    return this.http
      .get<EmployeeDto>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /** Neuen Mitarbeitenden anlegen */
  createEmployee(employee: EmployeeDto): Observable<EmployeeDto> {
    return this.http
      .post<EmployeeDto>(this.baseUrl, employee)
      .pipe(catchError(this.handleError));
  }

  /** Bestehenden Mitarbeitenden aktualisieren */
  updateEmployee(id: number, employee: EmployeeDto): Observable<EmployeeDto> {
    return this.http
      .put<EmployeeDto>(`${this.baseUrl}/${id}`, employee)
      .pipe(catchError(this.handleError));
  }

  /** Mitarbeitenden löschen */
  deleteEmployee(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /** Fehlerbehandlung */
  private handleError(error: any): Observable<never> {
    console.error('API call failed:', error);
    return throwError(() => new Error('Daten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.'));
  }
}
