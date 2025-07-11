import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { forkJoin, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import {
  NewDeviationSelectorDialogComponent,
  NewDeviationSelectorResult
} from './neue-abweichung-dialog/new-deviation-selector-dialog.component';
import {
  AbweichungDialogComponent,
  AbweichungDialogData,
  AbweichungData
} from './abweichung-dialog/abweichung-dialog.component';

import { CapacityService } from '../services/capacity.service';
import { MitarbeiterService } from '../services/mitarbeiter.service';
import { EmployeeDto } from '../models/employee';
import { CreateCapacityDeviationDto } from '../models/capacity.dtos';

/**
 * Interface representing a capacity deviation for display in the table.
 */
interface AbweichungView {
  capacityDeviationId: number;
  employeeId: number;
  neueKapazitaet: number;
  bemerkung?: string;
  name: string;
  startdatum: Date;
  enddatum: Date;
}

/**
 * Component for managing and displaying capacity deviations.
 * Allows filtering, adding, editing, and deleting deviations, and exporting data.
 */
@Component({
  selector: 'app-kapazitaetsabweichung',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './kapazitaetsabweichung.component.html',
  styleUrls: ['./kapazitaetsabweichung.component.scss'],
})
export class KapazitaetsabweichungComponent implements OnInit, AfterViewInit {
  /**
   * Defines the columns to be displayed in the capacity deviation table.
   */
  displayedColumns = ['name', 'zeitraum', 'kapazitaet', 'bemerkung', 'aktion'];
  /**
   * Data source for the MatTable, providing data to be rendered.
   */
  dataSource = new MatTableDataSource<AbweichungView>();
  /**
   * Stores the list of all employees, used for mapping employee IDs to names.
   */
  private employees: EmployeeDto[] = [];

  /**
   * Reference to the MatPaginator component for pagination controls.
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  /**
   * Reference to the MatSort component for sorting table columns.
   */
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private capacityService: CapacityService,
    private mitarbeiterService: MitarbeiterService
  ) {}

  /**
   * Initializes the component.
   * Sets up the filter predicate for the data source and loads initial data.
   */
  ngOnInit(): void {
    // Filter logic: filter by employee name or remark.
    this.dataSource.filterPredicate = (data, filter) =>
      data.name.toLowerCase().includes(filter) ||
      (data.bemerkung?.toLowerCase().includes(filter) ?? false);
    this.loadData();
  }

  /**
   * Lifecycle hook called after the component's view has been fully initialized.
   * Assigns the paginator and sort to the data source.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Loads employee and capacity deviation data from services and populates the table.
   * Handles errors during data loading and displays a snackbar notification.
   */
  private loadData(): void {
    forkJoin({
      emps: this.mitarbeiterService.getMitarbeiter(),
      devs: this.capacityService.getAbweichungen(),
    })
      .pipe(
        catchError((err) => {
          this.snackBar.open('Error loading data', 'Close', { duration: 3000 });
          return throwError(() => err);
        })
      )
      .subscribe(({ emps, devs }) => {
        this.employees = emps;
        this.dataSource.data = devs.map((d) => {
          const emp = emps.find((e) => e.employeeId === d.employeeId)!;
          return {
            capacityDeviationId: d.capacityDeviationId,
            employeeId: d.employeeId,
            neueKapazitaet: d.neueKapazitaet,
            bemerkung: d.bemerkung,
            name: `${emp.vorname} ${emp.name}`,
            startdatum: new Date(d.startDate),
            enddatum: new Date(d.endDate),
          };
        });
      });
  }

  /**
   * Applies a text filter to the table data.
   * @param event The input event from the filter field.
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.paginator?.firstPage();
  }

  /**
   * Opens a dialog to select an employee for a new capacity deviation,
   * then opens another dialog to enter the deviation details.
   * Creates the new deviation via the capacity service.
   */
  neueAbweichung(): void {
  this.dialog
    .open<NewDeviationSelectorDialogComponent, void, NewDeviationSelectorResult>(
      NewDeviationSelectorDialogComponent,
      { width: '400px' }
    )
    .afterClosed()
    .subscribe(res => {
      if (!res?.employeeId) {
        return;
      }
      // Pre-configure the deviation object with initial values.
      const initialAbweichung: AbweichungData = {
        employeeId:     res.employeeId,
        startdatum:     new Date(),
        enddatum:       new Date(),
        neueKapazitaet: 0,
        bemerkung:      ''
      };

      this.dialog
        .open<AbweichungDialogComponent, AbweichungDialogData>(
          AbweichungDialogComponent,
          {
            width: '500px',
            data: {
              mitarbeiter: this.employees,
              abweichung: initialAbweichung
            }
          }
        )
        .afterClosed()
        .subscribe(result => {
          if (!result) {
            return;
          }
          const dto: CreateCapacityDeviationDto = {
            employeeId:     result.employeeId,
            startDate:      result.startdatum.toISOString().slice(0,10),
            endDate:        result.enddatum.toISOString().slice(0,10),
            neueKapazitaet: result.neueKapazitaet,
            bemerkung:      result.bemerkung
          };
          this.capacityService.createAbweichung(dto).pipe(
            catchError(err => {
              this.snackBar.open('Error creating deviation', 'Close', { duration: 3000 });
              return throwError(() => err);
            }),
            finalize(() => {
              this.loadData();
              this.snackBar.open('Deviation created', 'OK', { duration: 2000 });
            })
          ).subscribe();
        });
    });
}

  /**
   * Opens a dialog to edit an existing capacity deviation.
   * Updates the deviation via the capacity service upon dialog close.
   * @param row The deviation data to be edited.
   */
bearbeiten(row: AbweichungView): void {
  const payload: AbweichungData = {
    id:             row.capacityDeviationId,
    employeeId:     row.employeeId,
    startdatum:     row.startdatum,
    enddatum:       row.enddatum,
    neueKapazitaet: row.neueKapazitaet,
    bemerkung:      row.bemerkung ?? ''
  };

  this.dialog
    .open<AbweichungDialogComponent, AbweichungDialogData>(
      AbweichungDialogComponent,
      { width: '500px', data: { mitarbeiter: this.employees, abweichung: payload } }
    )
    .afterClosed()
    .subscribe(result => {
        if (!result) {
          return;
        }
        const dto: CreateCapacityDeviationDto = {
          employeeId:     result.employeeId,
          startDate:      result.startdatum.toISOString().slice(0,10),
          endDate:        result.enddatum.toISOString().slice(0,10),
          neueKapazitaet: result.neueKapazitaet,
          bemerkung:      result.bemerkung
        };
        this.capacityService.updateAbweichung(row.capacityDeviationId, dto).pipe(
          catchError(err => {
            this.snackBar.open('Error updating deviation', 'Close', { duration: 3000 });
            return throwError(() => err);
          }),
          finalize(() => {
            this.loadData();
            this.snackBar.open('Deviation updated', 'OK', { duration: 2000 });
          })
        ).subscribe();
      });
  }
  /**
   * Deletes a capacity deviation after user confirmation.
   * @param row The deviation to be deleted.
   * @param event The mouse event that triggered the deletion.
   */
  loeschen(row: AbweichungView, event: MouseEvent): void {
    event.stopPropagation();
    if (!confirm(`Delete deviation for ${row.name}?`)) return;

    this.capacityService
      .deleteAbweichung(row.capacityDeviationId)
      .pipe(finalize(() => this.loadData()))
      .subscribe(() =>
        this.snackBar.open('Deviation deleted', 'OK', { duration: 2000 })
      );
  }

  /**
   * Exports the currently displayed capacity deviations to a CSV file.
   */
  exportieren(): void {
    const header = ['Name', 'Start Date', 'End Date', 'New Capacity', 'Remark'];
    const rows = this.dataSource.data.map((d) => [
      d.name,
      d.startdatum.toISOString().slice(0, 10),
      d.enddatum.toISOString().slice(0, 10),
      d.neueKapazitaet.toString(),
      d.bemerkung ?? '',
    ]);
    const csvContent = [
      header,
      ...rows
    ]
      .map((r) =>
        r
          .map((field) => `"${field.replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deviations.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
