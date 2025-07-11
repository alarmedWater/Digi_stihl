import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BefristungComponent } from './befristung.component';

/**
 * Test suite for the BefristungComponent.
 */
describe('BefristungComponent', () => {
  let component: BefristungComponent;
  let fixture: ComponentFixture<BefristungComponent>;

  /**
   * Asynchronous setup function to configure the testing module before each test.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BefristungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BefristungComponent);
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
