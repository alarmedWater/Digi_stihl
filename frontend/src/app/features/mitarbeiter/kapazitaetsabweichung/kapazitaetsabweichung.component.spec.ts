import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KapazitaetsabweichungComponent } from './kapazitaetsabweichung.component';

describe('KapazitaetsabweichungComponent', () => {
  let component: KapazitaetsabweichungComponent;
  let fixture: ComponentFixture<KapazitaetsabweichungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KapazitaetsabweichungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KapazitaetsabweichungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
