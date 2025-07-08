// src/app/features/mitarbeiter/kapazitaetsabweichung/kapazitaetsabweichung.component.ts
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { FormsModule }     from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule }  from '@angular/material/paginator';
import { MatSort, MatSortModule }            from '@angular/material/sort';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatButtonModule }     from '@angular/material/button';
import { MatIconModule }       from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog, MatDialogModule }        from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule }    from '@angular/material/snack-bar';

import { forkJoin, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { AbweichungDialogComponent, AbweichungDialogData, AbweichungData } from './abweichung-dialog/abweichung-dialog.component';
import { NewDeviationSelectorDialogComponent, NewDeviationSelectorResult } from './new-deviation-selector-dialog.component';

import { CapacityService }    from '../services/capacity.service';
import { MitarbeiterService } from '../services/mitarbeiter.service';
import { EmployeeDto }        from '../../models/employee';
import { CreateCapacityDeviationDto } from '../models/capacity.dtos';

interface AbweichungView {
  capacityDeviationId: number;
  employeeId:          number;
  neueKapazitaet:      number;
  bemerkung:           string;
  name:                string;
  startdatum:          Date;
  enddatum:            Date;
}

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
    MatSnackBarModule
  ],
  templateUrl: './kapazitaetsabweichung.component.html',
  styleUrls: ['./kapazitaetsabweichung.component.scss']
})
export class KapazitaetsabweichungComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'zeitraum', 'kapazitaet', 'bemerkung', 'aktion'];
  dataSource = new MatTableDataSource<AbweichungView>();
  private employees: EmployeeDto[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private capacityService: CapacityService,
    private mitarbeiterService: MitarbeiterService
  ) {}

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data, filter) =>
      data.name.toLowerCase().includes(filter) ||
      data.bemerkung.toLowerCase().includes(filter);
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }

  private loadData(): void {
    forkJoin({
      emps: this.mitarbeiterService.getMitarbeiter(),
      devs: this.capacityService.getAbweichungen()
    })
      .pipe(catchError(err => {
        this.snackBar.open('Fehler beim Laden der Daten', 'Schließen', { duration: 3000 });
        return throwError(() => err);
      }))
      .subscribe(({ emps, devs }) => {
        this.employees = emps;
        this.dataSource.data = devs.map(d => {
          const emp = emps.find(e => e.employeeId === d.employeeId)!;
          return {
            capacityDeviationId: d.capacityDeviationId,
            employeeId:          d.employeeId,
            neueKapazitaet:      d.neueKapazitaet,
            bemerkung:           d.bemerkung || '',
            name:                `${emp.vorname} ${emp.name}`,
            startdatum:          new Date(d.startDate),
            enddatum:            new Date(d.endDate)
          };
        });
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.paginator?.firstPage();
  }

  bearbeiten(row: AbweichungView): void {
    const payload: AbweichungData = {
      id:             row.capacityDeviationId,
      employeeId:     row.employeeId,
      startdatum:     row.startdatum,
      enddatum:       row.enddatum,
      neueKapazitaet: row.neueKapazitaet,
      bemerkung:      row.bemerkung
    };

    this.dialog.open(AbweichungDialogComponent, {
      width: '500px',
      data: { abweichung: payload, mitarbeiter: this.employees }
    }).afterClosed().subscribe(result => {
      if (!result) return;
      const dto: CreateCapacityDeviationDto = {
        employeeId:     result.employeeId,
        startDate:      result.startdatum.toISOString().slice(0,10),
        endDate:        result.enddatum.toISOString().slice(0,10),
        neueKapazitaet: result.neueKapazitaet,
        bemerkung:      result.bemerkung
      };
      this.capacityService.updateAbweichung(row.capacityDeviationId, dto)
        .pipe(finalize(() => this.loadData()))
        .subscribe(() => this.snackBar.open('Abweichung aktualisiert', 'OK', { duration: 2000 }));
    });
  }

  loeschen(row: AbweichungView, event: MouseEvent): void {
    event.stopPropagation();
    if (!confirm(`Löschen der Abweichung von ${row.name}?`)) return;
    this.capacityService.deleteAbweichung(row.capacityDeviationId)
      .pipe(finalize(() => this.loadData()))
      .subscribe(() => this.snackBar.open('Abweichung gelöscht', 'OK', { duration: 2000 }));
  }

  neueAbweichung(): void {
    const dialogRef = this.dialog.open<NewDeviationSelectorDialogComponent, { mitarbeiter: EmployeeDto[] }, NewDeviationSelectorResult>(
      NewDeviationSelectorDialogComponent,
      { width: '400px', data: { mitarbeiter: this.employees } }
    );

    dialogRef.afterClosed().subscribe(res => {
      if (!res) return;
      // open create dialog
      const payload: AbweichungData = { employeeId: res.employeeId, startdatum: new Date(), enddatum: new Date(), neueKapazitaet: 1, bemerkung: '' };
      this.dialog.open(AbweichungDialogComponent, { width: '500px', data: { mitarbeiter: this.employees, abweichung: payload } })
        .afterClosed().subscribe(result => {
          if (!result) return;
          const dto: CreateCapacityDeviationDto = {
            employeeId:     result.employeeId,
            startDate:      result.startdatum.toISOString().slice(0,10),
            endDate:        result.enddatum.toISOString().slice(0,10),
            neueKapazitaet: result.neueKapazitaet,
            bemerkung:      result.bemerkung
          };
          this.capacityService.createAbweichung(dto)
            .pipe(finalize(() => this.loadData()))
            .subscribe(() => this.snackBar.open('Abweichung erstellt', 'OK', { duration: 2000 }));
        });
    });
  }

  exportieren(): void {
    const header = ['Name','Startdatum','Enddatum','Neue Kapazität','Bemerkung'];
    const rows = this.dataSource.data.map(d => [
      d.name,
      d.startdatum.toISOString().slice(0,10),
      d.enddatum.toISOString().slice(0,10),
      d.neueKapazitaet.toString(),
      d.bemerkung
    ]);
    const csv = [header, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'abweichungen.csv';
    link.click();
  }
}
