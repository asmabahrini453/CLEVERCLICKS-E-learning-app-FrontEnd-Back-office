import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEarningsComponent } from './order-earnings.component';

describe('OrderEarningsComponent', () => {
  let component: OrderEarningsComponent;
  let fixture: ComponentFixture<OrderEarningsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderEarningsComponent]
    });
    fixture = TestBed.createComponent(OrderEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
