import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AustritteComponent } from './austritte.component';

// Test suite for the AustritteComponent.
describe('AustritteComponent', () => {
  let component: AustritteComponent;
  let fixture: ComponentFixture<AustritteComponent>;

  /**
   * Asynchronous setup function to configure the testing module before each test.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AustritteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AustritteComponent);
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
