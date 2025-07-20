import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnlegenComponent } from './anlegen.component';

// Test suite for the AnlegenComponent.
describe('AnlegenComponent', () => {
  let component: AnlegenComponent;
  let fixture: ComponentFixture<AnlegenComponent>;

  /**
   * Asynchronous setup function to configure the testing module before each test.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnlegenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnlegenComponent);
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
