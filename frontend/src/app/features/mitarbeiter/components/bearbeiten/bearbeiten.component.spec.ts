import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BearbeitenComponent } from './bearbeiten.component';

// Test suite for the BearbeitenComponent.
describe('BearbeitenComponent', () => {
  let component: BearbeitenComponent;
  let fixture: ComponentFixture<BearbeitenComponent>;

  /**
   * Asynchronous setup function to configure the testing module before each test.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BearbeitenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BearbeitenComponent);
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
