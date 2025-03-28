import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluktuationComponent } from './fluktuation.component';

describe('FluktuationComponent', () => {
  let component: FluktuationComponent;
  let fixture: ComponentFixture<FluktuationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluktuationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluktuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
