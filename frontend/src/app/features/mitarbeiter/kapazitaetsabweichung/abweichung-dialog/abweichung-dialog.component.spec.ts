import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbweichungDialogComponent } from './abweichung-dialog.component';

describe('AbweichungDialogComponent', () => {
  let component: AbweichungDialogComponent;
  let fixture: ComponentFixture<AbweichungDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbweichungDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbweichungDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
