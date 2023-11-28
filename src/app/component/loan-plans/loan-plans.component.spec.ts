import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPlansComponent } from './loan-plans.component';

describe('LoanPlansComponent', () => {
  let component: LoanPlansComponent;
  let fixture: ComponentFixture<LoanPlansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanPlansComponent]
    });
    fixture = TestBed.createComponent(LoanPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
