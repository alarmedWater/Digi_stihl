// src/app/services/mitarbeiter.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { EmployeeDto }       from '../models/employee';
import { EmployeeFilterDto } from '../models/employee-filter';

@Injectable({
  providedIn: 'root'
})
export class MitarbeiterService {
  private readonly baseUrl = `${environment.apiUrl}/employees`;

  constructor(private http: HttpClient) { }

  /**
   * Alle Mitarbeitenden holen, optional gefiltert
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
    return this.http.get<EmployeeDto[]>(this.baseUrl, { params });
  }

  /**
   * Einzelnen Mitarbeitenden nach ID holen
   */
  getMitarbeiterById(id: number): Observable<EmployeeDto> {
    return this.http.get<EmployeeDto>(`${this.baseUrl}/${id}`);
  }

  /**
   * Neuen Mitarbeitenden anlegen
   */
  createMitarbeiter(emp: EmployeeDto): Observable<EmployeeDto> {
    return this.http.post<EmployeeDto>(this.baseUrl, emp);
  }

  /**
   * Bestehenden Mitarbeitenden aktualisieren
   */
  updateMitarbeiter(id: number, emp: EmployeeDto): Observable<EmployeeDto> {
    return this.http.put<EmployeeDto>(`${this.baseUrl}/${id}`, emp);
  }

  /**
   * Mitarbeitenden löschen
   */
  deleteMitarbeiter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
