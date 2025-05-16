import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ATZComponent } from './atz.component';

describe('ATZComponent', () => {
  let component: ATZComponent;
  let fixture: ComponentFixture<ATZComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ATZComponent], // für Standalone-Komponente
    }).compileComponents();

    fixture = TestBed.createComponent(ATZComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
