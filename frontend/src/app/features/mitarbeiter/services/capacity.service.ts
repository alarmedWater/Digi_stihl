
// src/app/features/mitarbeiter/services/capacity.service.ts
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

import {
  CapacityDeviationDto,
  CapacityFilterDto,
  CreateCapacityDeviationDto,
  DirectCapacityOverviewDto,
  IndirectCapacityOverviewDto
} from '../models/capacity.dtos';

@Injectable({
  providedIn: 'root'
})
export class CapacityService {
  /** Basis-URL für Deviation-API */
  private readonly deviationsUrl = `${environment.apiUrl}/capacities/deviations`;
  /** Basis-URL für Overview-API */
  private readonly overviewUrl   = `${environment.apiUrl}/capacities`;

  constructor(private http: HttpClient) {}

  /** Ruft gefilterte Kapazitätsabweichungen ab */
  getAbweichungen(filter?: CapacityFilterDto): Observable<CapacityDeviationDto[]> {
    let params = new HttpParams();
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value != null && value !== '') {
          params = params.set(key, String(value));
        }
      });
    }
    return this.http
      .get<CapacityDeviationDto[]>(this.deviationsUrl, { params })
      .pipe(
        tap(list => console.debug('Fetched deviations:', list)),
        catchError(this.handleError)
      );
  }

  /** Holt eine einzelne Abweichung per ID */
  getAbweichungById(id: number): Observable<CapacityDeviationDto> {
    return this.http
      .get<CapacityDeviationDto>(`${this.deviationsUrl}/${id}`)
      .pipe(
        tap(dto => console.debug(`Fetched deviation ${id}:`, dto)),
        catchError(this.handleError)
      );
  }

  /** Erstellt eine neue Kapazitätsabweichung */
  createAbweichung(dto: CreateCapacityDeviationDto): Observable<CapacityDeviationDto> {
    return this.http
      .post<CapacityDeviationDto>(this.deviationsUrl, dto)
      .pipe(
        tap(created => console.debug('Created deviation:', created)),
        catchError(this.handleError)
      );
  }

  /** Aktualisiert eine bestehende Abweichung */
  updateAbweichung(
    id: number,
    dto: CreateCapacityDeviationDto
  ): Observable<CapacityDeviationDto> {
    return this.http
      .put<CapacityDeviationDto>(`${this.deviationsUrl}/${id}`, dto)
      .pipe(
        tap(updated => console.debug(`Updated deviation ${id}:`, updated)),
        catchError(this.handleError)
      );
  }

  /** Löscht eine Kapazitätsabweichung */
  deleteAbweichung(id: number): Observable<HttpResponse<void>> {
    return this.http
      .delete<void>(`${this.deviationsUrl}/${id}`, { observe: 'response' })
      .pipe(
        tap(res => console.debug(`Deleted deviation ${id}, status ${res.status}`)),
        catchError(this.handleError)
      );
  }

  /** Holt die direkte Kapazitätsübersicht */
  getDirectOverview(
    startYear: number,
    startMonth: number
  ): Observable<DirectCapacityOverviewDto> {
    let params = new HttpParams()
      .set('startYear', String(startYear))
      .set('startMonth', String(startMonth));
    return this.http
      .get<DirectCapacityOverviewDto>(`${this.overviewUrl}/direct-overview`, { params })
      .pipe(
        tap(dto => console.debug('Fetched direct overview:', dto)),
        catchError(this.handleError)
      );
  }

  /** Holt die indirekte Kapazitätsübersicht */
  getIndirectOverview(
    startYear: number,
    startMonth: number
  ): Observable<IndirectCapacityOverviewDto> {
    let params = new HttpParams()
      .set('startYear', String(startYear))
      .set('startMonth', String(startMonth));
    return this.http
      .get<IndirectCapacityOverviewDto>(`${this.overviewUrl}/indirect-overview`, { params })
      .pipe(
        tap(dto => console.debug('Fetched indirect overview:', dto)),
        catchError(this.handleError)
      );
  }

  /** Einheitliche Fehlerbehandlung */
  private handleError(error: HttpErrorResponse) {
    console.error('API error:', error);
    const msg =
      error.error?.detail || error.error?.message || `Server returned code ${error.status}`;
    return throwError(() => new Error(msg));
  }
}
