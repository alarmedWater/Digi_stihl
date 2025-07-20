import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbweichungDialogComponent } from './abweichung-dialog.component';

// Test suite for the AbweichungDialogComponent.
describe('AbweichungDialogComponent', () => {
  let component: AbweichungDialogComponent;
  let fixture: ComponentFixture<AbweichungDialogComponent>;

  /**
   * Asynchronous setup function to configure the testing module before each test.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbweichungDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbweichungDialogComponent);
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
