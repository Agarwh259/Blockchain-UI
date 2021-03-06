import { Component, OnInit } from '@angular/core';
import {Guid } from "guid-typescript";
import {Property} from '../property';
import { PaymentTransaction } from 'src/app/shared/models/transaction/payment';
import { IssuerType } from 'src/app/shared/models/transaction/issuer-type.enum';
import TransactionType from 'src/app/shared/models/transaction/transaction-type.enum';
import { PaymentStatus } from 'src/app/shared/models/transaction/payment-status.enum';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  public options = {
    timeOut: 5000,
    position:["top","right"]
      };

  constructor(private transactionservice: TransactionService, private spinner: NgxSpinnerService
    ,private _service: NotificationsService) {

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
      premiumAmount : 1.00,
      paymentStatus : 'N',
      processedByIEES : 'N',
      processedByMCO: 'N',
      paymentDate : undefined
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
      this.spinner.show();
     this.transactionservice
      .submit(newInvoiceEntity)
      .then(result =>
        {
          console.log("inside then");
          console.log(result);
          console.log(result.status);
          this.spinner.hide();
          this._service.create('Success','"Invoice submitted successfully"',NotificationType.Success);
        })
      .catch(error => {
        console.log("inside catch");
        console.log(error);
        this.spinner.hide();
        console.log(error.status);
        this._service.create('Error','"Something went wrong. Unable to submit transaction.!"',NotificationType.Error);
      });
  }
}
