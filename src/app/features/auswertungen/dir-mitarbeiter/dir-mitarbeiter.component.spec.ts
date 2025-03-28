import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirMitarbeiterComponent } from './dir-mitarbeiter.component';

describe('DirMitarbeiterComponent', () => {
  let component: DirMitarbeiterComponent;
  let fixture: ComponentFixture<DirMitarbeiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirMitarbeiterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirMitarbeiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
