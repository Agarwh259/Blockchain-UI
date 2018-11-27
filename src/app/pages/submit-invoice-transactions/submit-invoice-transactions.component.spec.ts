import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitInvoiceTransactionsComponent } from './submit-invoice-transactions.component';

describe('SubmitInvoiceTransactionsComponent', () => {
  let component: SubmitInvoiceTransactionsComponent;
  let fixture: ComponentFixture<SubmitInvoiceTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitInvoiceTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitInvoiceTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
