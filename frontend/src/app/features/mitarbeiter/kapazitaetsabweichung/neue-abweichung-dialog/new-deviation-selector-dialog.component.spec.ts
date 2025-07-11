import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDeviationSelectorDialogComponent } from './new-deviation-selector-dialog.component';

describe('NewDeviationSelectorDialogComponent', () => {
  let component: NewDeviationSelectorDialogComponent;
  let fixture: ComponentFixture<NewDeviationSelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDeviationSelectorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDeviationSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
