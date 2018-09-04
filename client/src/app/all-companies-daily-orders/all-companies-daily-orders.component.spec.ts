import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCompaniesDailyOrdersComponent } from './all-companies-daily-orders.component';

describe('AllCompaniesDailyOrdersComponent', () => {
  let component: AllCompaniesDailyOrdersComponent;
  let fixture: ComponentFixture<AllCompaniesDailyOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCompaniesDailyOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCompaniesDailyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
