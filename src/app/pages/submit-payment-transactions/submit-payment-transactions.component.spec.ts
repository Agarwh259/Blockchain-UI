import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitPaymentTransactionsComponent } from './submit-payment-transactions.component';

describe('SubmitPaymentTransactionsComponent', () => {
  let component: SubmitPaymentTransactionsComponent;
  let fixture: ComponentFixture<SubmitPaymentTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitPaymentTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitPaymentTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
