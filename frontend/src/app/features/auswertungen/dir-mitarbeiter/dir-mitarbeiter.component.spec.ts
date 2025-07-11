import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirMitarbeiterComponent } from './dir-mitarbeiter.component';

/**
 * Test suite for the DirMitarbeiterComponent.
 */
describe('DirMitarbeiterComponent', () => {
  let component: DirMitarbeiterComponent;
  let fixture: ComponentFixture<DirMitarbeiterComponent>;

  /**
   * Asynchronous setup function to configure the testing module before each test.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirMitarbeiterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirMitarbeiterComponent);
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
