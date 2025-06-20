import { Component, OnInit, Inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatButtonModule }     from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { MatSelectModule }     from '@angular/material/select';

import { MitarbeiterService } from '../../services/mitarbeiter.service';
import { EmployeeDto }        from '../../models/employee';

// Union-Typen direkt inline
type Bereich = 'Direkt' | 'Indirekt';
type Arbeitsverhaeltnis = 'Befristet' | 'Unbefristet';

interface Mitarbeiter {
  id: number;
  vorname: string;
  nachname: string;
  kostenstelle: string;
  bereich: Bereich;
  eintritt: string;
  // Felder, die wir fürs Update nachreichen
  arbeitsverhaeltnis: Arbeitsverhaeltnis;
  fte: number;
}

@Component({
  selector: 'app-bearbeiten',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './bearbeiten.component.html',
  styleUrls: ['./bearbeiten.component.scss'],
})
export class BearbeitenComponent implements OnInit {
  displayedColumns = [
    'vorname',
    'nachname',
    'kostenstelle',
    'bereich',
    'eintritt',
    'aktion'
  ];

  mitarbeiterListe: Mitarbeiter[] = [];
  gefilterteListe: Mitarbeiter[] = [];
  filterWert = '';

  constructor(
    private svc: MitarbeiterService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadMitarbeiter();
  }

  private loadMitarbeiter(): void {
    this.svc.getMitarbeiter()
      .subscribe((dtos: EmployeeDto[]) => {
        this.mitarbeiterListe = dtos.map(dto => ({
          id:                 dto.employeeId!,     // assert nie undefined
          vorname:            dto.vorname,
          nachname:           dto.name,
          kostenstelle:       dto.kostenstelle!,
          bereich:            dto.bereich,
          eintritt:           dto.eintritt,
          arbeitsverhaeltnis: dto.arbeitsverhaeltnis,
          fte:                dto.fte
        }));
        this.gefilterteListe = [...this.mitarbeiterListe];
      });
  }

  applyFilter(): void {
    const v = this.filterWert.trim().toLowerCase();
    this.gefilterteListe = this.mitarbeiterListe.filter(m =>
      m.vorname.toLowerCase().includes(v)
      || m.nachname.toLowerCase().includes(v)
      || m.bereich.toLowerCase().includes(v)
    );
  }

  bearbeiten(m: Mitarbeiter): void {
    const ref = this.dialog.open(MitarbeiterBearbeitenDialog, {
      width:  '400px',
      data:   m
    });
    ref.afterClosed().subscribe(changed => {
      if (changed) this.loadMitarbeiter();
    });
  }
}

@Component({
  selector: 'mitarbeiter-bearbeiten-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ],
  template: `
    <h2 mat-dialog-title>Mitarbeiter bearbeiten</h2>
    <mat-dialog-content>
      <form [formGroup]="f">
        <mat-form-field class="full-width">
          <mat-label>Vorname</mat-label>
          <input matInput formControlName="vorname">
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Nachname</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Kostenstelle</mat-label>
          <input matInput formControlName="kostenstelle">
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Bereich</mat-label>
          <mat-select formControlName="bereich">
            <mat-option value="Direkt">Direkt</mat-option>
            <mat-option value="Indirekt">Indirekt</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Eintritt</mat-label>
          <input matInput type="date" formControlName="eintritt">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="abbrechen()">Abbrechen</button>
      <button mat-flat-button color="primary" (click)="speichern()" [disabled]="f.invalid">
        Speichern
      </button>
    </mat-dialog-actions>
  `,
  styles: [`.full-width { width: 100%; }`]
})
export class MitarbeiterBearbeitenDialog {
  f: FormGroup;

  constructor(
    private fb: FormBuilder,
    private svc: MitarbeiterService,
    public dialogRef: MatDialogRef<MitarbeiterBearbeitenDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Mitarbeiter
  ) {
    this.f = this.fb.group({
      vorname:      [data.vorname, Validators.required],
      nachname:     [data.nachname, Validators.required],
      kostenstelle: [data.kostenstelle, Validators.required],
      bereich:      [data.bereich, Validators.required],
      eintritt:     [data.eintritt, Validators.required]
    });
  }

  speichern(): void {
    if (this.f.invalid) return;

    const form = this.f.value;
    // Wir füllen alle Felder, die das DTO verlangt,
    // und übernehmen arbeitsverhaeltnis+fte aus den Ursprungsdaten
    const dto: EmployeeDto = {
      employeeId:        this.data.id,
      vorname:           form.vorname,
      name:              form.nachname,
      kostenstelle:      form.kostenstelle,
      bereich:           form.bereich,
      eintritt:          form.eintritt,
      arbeitsverhaeltnis: this.data.arbeitsverhaeltnis,
      fte:                this.data.fte
    };

    this.svc.updateMitarbeiter(dto.employeeId!, dto)
      .subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error(err)
      });
  }

  abbrechen(): void {
    this.dialogRef.close(false);
  }
}
