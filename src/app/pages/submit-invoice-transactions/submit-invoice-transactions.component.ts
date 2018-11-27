import { Component, OnInit } from '@angular/core';
import {Guid } from "guid-typescript";
import {Property} from '../property';
import { PaymentTransaction } from 'src/app/shared/models/transaction/payment';
import { IssuerType } from 'src/app/shared/models/transaction/issuer-type.enum';
import TransactionType from 'src/app/shared/models/transaction/transaction-type.enum';
import { PaymentStatus } from 'src/app/shared/models/transaction/payment-status.enum';


@Component({
  selector: 'app-submit-invoice-transactions',
  templateUrl: './submit-invoice-transactions.component.html',
  styleUrls: ['./submit-invoice-transactions.component.scss']
})
export class SubmitInvoiceTransactionsComponent implements OnInit {

  issuerList : Property[];
  processingStatus : Property[];
  invoiceEntity : PaymentTransaction;

  paymentStatus : Property[];
 

  constructor() { 
    
  }

  ngOnInit() {
    this.invoiceEntity = {
      transactionId : Guid.create(),
      transactionType : TransactionType.Invoice,
      caseNumber : undefined,
      coverageMonth : undefined,
      issuerId : undefined,
      invoiceDate : undefined,
      dueDate : undefined,
      premiumAmount : undefined,
      paymentStatus : undefined,
      processedByIEES : undefined,
    }

    this.issuerList = [
      {id : IssuerType.Aetna, value : IssuerType[IssuerType.Aetna] },
      {id : IssuerType.Passport, value : IssuerType[IssuerType.Passport] },
      {id : IssuerType.Wellcare, value : IssuerType[IssuerType.Wellcare] },
      {id : IssuerType.HumanaCareSource, value : IssuerType[IssuerType.HumanaCareSource] },
      {id : IssuerType.Anthem, value : IssuerType[IssuerType.Anthem] }
    ];

    this.processingStatus = [
      {id : 'Y', value : 'Yes' },
      {id : 'N', value : 'No' },
    ]

    this.paymentStatus = [
      {id : PaymentStatus.Yes, value : 'Yes' },
      {id : PaymentStatus.No, value : 'No' },
    ]
  }

  submitInvoiceTransaction(newInvoiceEntity : PaymentTransaction) : void
  {
    console.log(newInvoiceEntity);
  }
}
