import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtzComponent } from './atz.component';

describe('AtzComponent', () => {
  let component: AtzComponent;
  let fixture: ComponentFixture<AtzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtzComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
