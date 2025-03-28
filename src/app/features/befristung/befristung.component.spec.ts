import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BefristungComponent } from './befristung.component';

describe('BefristungComponent', () => {
  let component: BefristungComponent;
  let fixture: ComponentFixture<BefristungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BefristungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BefristungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
