import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndirMitarbeiterComponent } from './indir-mitarbeiter.component';

describe('IndirMitarbeiterComponent', () => {
  let component: IndirMitarbeiterComponent;
  let fixture: ComponentFixture<IndirMitarbeiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndirMitarbeiterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndirMitarbeiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
