import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishCardCreateComponent } from './dish-card-create.component';

describe('DishCardCreateComponent', () => {
  let component: DishCardCreateComponent;
  let fixture: ComponentFixture<DishCardCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishCardCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishCardCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
