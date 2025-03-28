import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AustritteComponent } from './austritte.component';

describe('AustritteComponent', () => {
  let component: AustritteComponent;
  let fixture: ComponentFixture<AustritteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AustritteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AustritteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
