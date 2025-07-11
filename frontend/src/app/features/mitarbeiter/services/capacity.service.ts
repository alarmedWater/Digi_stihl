
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

/**
 * Service for managing capacity-related operations, including deviations and overviews.
 * Interacts with the backend API to fetch, create, update, and delete capacity data.
 */
@Injectable({
  providedIn: 'root'
})
export class CapacityService {
  /** Base URL for the Capacity Deviations API endpoint. */
  private readonly deviationsUrl = `${environment.apiUrl}/capacities/deviations`;
  /** Base URL for the Capacity Overview API endpoint. */
  private readonly overviewUrl   = `${environment.apiUrl}/capacities`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves filtered capacity deviations from the API.
   * @param filter Optional filter criteria for the deviations.
   * @returns An Observable that emits an array of CapacityDeviationDto objects.
   */
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

  /**
   * Retrieves a single capacity deviation by its ID.
   * @param id The ID of the capacity deviation.
   * @returns An Observable that emits a CapacityDeviationDto object.
   */
  getAbweichungById(id: number): Observable<CapacityDeviationDto> {
    return this.http
      .get<CapacityDeviationDto>(`${this.deviationsUrl}/${id}`)
      .pipe(
        tap(dto => console.debug(`Fetched deviation ${id}:`, dto)),
        catchError(this.handleError)
      );
  }

  /**
   * Creates a new capacity deviation.
   * @param dto The data transfer object containing the new deviation details.
   * @returns An Observable that emits the created CapacityDeviationDto object.
   */
  createAbweichung(dto: CreateCapacityDeviationDto): Observable<CapacityDeviationDto> {
    return this.http
      .post<CapacityDeviationDto>(this.deviationsUrl, dto)
      .pipe(
        tap(created => console.debug('Created deviation:', created)),
        catchError(this.handleError)
      );
  }

  /**
   * Updates an existing capacity deviation.
   * @param id The ID of the deviation to update.
   * @param dto The data transfer object containing the updated deviation details.
   * @returns An Observable that emits the updated CapacityDeviationDto object.
   */
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

  /**
   * Deletes a capacity deviation by its ID.
   * @param id The ID of the deviation to delete.
   * @returns An Observable that emits an HttpResponse<void> upon successful deletion.
   */
  deleteAbweichung(id: number): Observable<HttpResponse<void>> {
    return this.http
      .delete<void>(`${this.deviationsUrl}/${id}`, { observe: 'response' })
      .pipe(
        tap(res => console.debug(`Deleted deviation ${id}, status ${res.status}`)),
        catchError(this.handleError)
      );
  }

  /**
   * Retrieves the direct capacity overview for a given start year and month.
   * @param startYear The starting year for the overview.
   * @param startMonth The starting month for the overview (1-indexed).
   * @returns An Observable that emits a DirectCapacityOverviewDto object.
   */
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

  /**
   * Retrieves the indirect capacity overview for a given start year and month.
   * @param startYear The starting year for the overview.
   * @param startMonth The starting month for the overview (1-indexed).
   * @returns An Observable that emits an IndirectCapacityOverviewDto object.
   */
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

  /**
   * Centralized error handling for HTTP requests.
   * Logs the error and throws a new error with a user-friendly message.
   * @param error The HttpErrorResponse received from the API.
   * @returns An Observable that emits an error.
   */
  private handleError(error: HttpErrorResponse) {
    console.error('API error:', error);
    const msg =
      error.error?.detail || error.error?.message || `Server returned code ${error.status}`;
    return throwError(() => new Error(msg));
  }
}
