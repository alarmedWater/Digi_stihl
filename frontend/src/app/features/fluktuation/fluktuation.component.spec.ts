import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluktuationComponent } from './fluktuation.component';

// Test suite for the FluktuationComponent.
describe('FluktuationComponent', () => {
  let component: FluktuationComponent;
  let fixture: ComponentFixture<FluktuationComponent>;

  /**
   * Asynchronous setup function to configure the testing module before each test.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluktuationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluktuationComponent);
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
