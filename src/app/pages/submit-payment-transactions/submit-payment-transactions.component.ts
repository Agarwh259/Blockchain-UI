import { Component, OnInit } from '@angular/core';
import { AbstractFormGroupDirective } from '@angular/forms';
import {Guid } from "guid-typescript";
import {Property} from '../property'
import { IssuerType } from 'src/app/shared/models/transaction/issuer-type.enum';
import { PaymentTransaction } from 'src/app/shared/models/transaction/payment';
import TransactionType from 'src/app/shared/models/transaction/transaction-type.enum';
import { PaymentStatus } from 'src/app/shared/models/transaction/payment-status.enum';

@Component({
  selector: 'app-submit-payment-transactions',
  templateUrl: './submit-payment-transactions.component.html',
  styleUrls: ['./submit-payment-transactions.component.scss']
})


export class SubmitPaymentTransactionsComponent implements OnInit {

  issuerList : Property[];
  processingStatus : Property[];

  paymentEntity : PaymentTransaction; 

  paymentStatus : Property[];

  constructor() { 
    
  }

  ngOnInit() {
    this.paymentEntity = {
      transactionId : Guid.create(),
      transactionType : TransactionType.Payment,
      caseNumber : undefined,
      coverageMonth : undefined,
      issuerId : undefined,
      invoiceDate : undefined,
      dueDate : undefined,
      premiumAmount : undefined,
      paymentStatus : undefined,
      paymentDate : undefined,
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
submitPaymentTransaction(newPaymentEntity : PaymentTransaction) : void
  {
    console.log(newPaymentEntity);
  }
}
