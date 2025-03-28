import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalentwicklungComponent } from './personalentwicklung.component';

describe('PersonalentwicklungComponent', () => {
  let component: PersonalentwicklungComponent;
  let fixture: ComponentFixture<PersonalentwicklungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalentwicklungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalentwicklungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
