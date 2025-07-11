import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndirMitarbeiterComponent } from './indir-mitarbeiter.component';

/**
 * Test suite for the IndirMitarbeiterComponent.
 */
describe('IndirMitarbeiterComponent', () => {
  let component: IndirMitarbeiterComponent;
  let fixture: ComponentFixture<IndirMitarbeiterComponent>;

  /**
   * Asynchronous setup function to configure the testing module before each test.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndirMitarbeiterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndirMitarbeiterComponent);
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
