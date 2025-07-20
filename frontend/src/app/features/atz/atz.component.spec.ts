import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtzComponent } from './atz.component';

// Test suite for the AtzComponent.
describe('AtzComponent', () => {
  let component: AtzComponent;
  let fixture: ComponentFixture<AtzComponent>;

  /**
   * Asynchronous setup function to configure the testing module before each test.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtzComponent], // Import the standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(AtzComponent);
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
