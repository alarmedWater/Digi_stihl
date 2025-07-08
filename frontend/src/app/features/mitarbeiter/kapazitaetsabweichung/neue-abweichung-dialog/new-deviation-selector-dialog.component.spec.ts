/* src/app/features/mitarbeiter/kapazitaetsabweichung/new-deviation-selector-dialog.component.spec.ts */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NewDeviationSelectorDialogComponent } from './new-deviation-selector-dialog.component';
import { EmployeeDto } from '../../models/employee';

describe('NewDeviationSelectorDialogComponent', () => {
  let component: NewDeviationSelectorDialogComponent;
  let fixture: ComponentFixture<NewDeviationSelectorDialogComponent>;
  const mockEmployees: EmployeeDto[] = [
    { employeeId: 1, vorname: 'Max', name: 'Müller', kostenstelle: 'D001' },
    { employeeId: 2, vorname: 'Anna', name: 'Schmidt', kostenstelle: 'D002' },
    { employeeId: 3, vorname: 'Peter', name: 'Maier', kostenstelle: 'D001' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule
      ],
      declarations: [NewDeviationSelectorDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: { mitarbeiter: mockEmployees } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewDeviationSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter employees by name search', () => {
    component.form.get('search')!.setValue('Anna');
    expect(component.filteredEmployees.length).toBe(1);
    expect(component.filteredEmployees[0].vorname).toBe('Anna');
  });

  it('should show all employees when search empty', () => {
    component.form.get('search')!.setValue('');
    expect(component.filteredEmployees.length).toBe(mockEmployees.length);
  });

  it('should disable next button when no employee selected', () => {
    component.form.get('search')!.setValue('Max');
    fixture.detectChanges();
    const nextBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button[color="primary"]');
    expect(nextBtn.disabled).toBeTrue();
  });

  it('should enable next button when employee selected', () => {
    component.form.get('search')!.setValue('Peter');
    fixture.detectChanges();
    component.form.get('employeeId')!.setValue(3);
    fixture.detectChanges();
    const nextBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button[color="primary"]');
    expect(nextBtn.disabled).toBeFalse();
  });
});
