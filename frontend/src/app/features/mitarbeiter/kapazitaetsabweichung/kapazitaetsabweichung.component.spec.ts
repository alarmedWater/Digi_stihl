import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KapazitaetsabweichungComponent } from './kapazitaetsabweichung.component';

/**
 * Test suite for the KapazitaetsabweichungComponent.
 */
describe('KapazitaetsabweichungComponent', () => {
  let component: KapazitaetsabweichungComponent;
  let fixture: ComponentFixture<KapazitaetsabweichungComponent>;

  /**
   * Asynchronous setup function to configure the testing module before each test.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KapazitaetsabweichungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KapazitaetsabweichungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test case to ensure that the component is created successfully.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
