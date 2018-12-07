import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../shared/services/data.service';
import { PaymentSearchTransaction } from 'src/app/shared/models/transaction/payment-search';
import { Property } from '../property';
import { IssuerType } from 'src/app/shared/models/transaction/issuer-type.enum';
import TransactionType from 'src/app/shared/models/transaction/transaction-type.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';
import { LoggerService } from 'src/app/shared/services/logging/logger.service';
import Loglevel from 'src/app/shared/models/logging/loglevel.enum';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-search-payment-transactions',
  templateUrl: './search-payment-transactions.component.html',
  styleUrls: ['./search-payment-transactions.component.scss'],
  providers: [DataService]
})
export class SearchPaymentTransactionsComponent implements OnInit {

  showSearchResults = false;
  rawSearchResults = [];
  paymentFilteredRecords = [];
  modalTransactionDetails = [];
  userName:any;

  issuerList : Property[];
  processingStatus : Property[];

  searchPaymentEntity : PaymentSearchTransaction;

  constructor(private data: DataService, private modalService: NgbModal,
    private spinner: NgxSpinnerService, private transactionService: TransactionService,
    private logger: LoggerService, private _service: NotificationsService) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('Role').toLowerCase();

    this.searchPaymentEntity = {
      caseNumber : undefined,
      issuerId : undefined,
      createDate : undefined,
      coverageMonth : undefined,
      processedByIEES : undefined
    }

    this.processingStatus = [
      {id : 'Y', value : 'Yes' },
      {id : 'N', value : 'No' },
    ]

    this.issuerList = [
      {id : IssuerType.Aetna, value : IssuerType[IssuerType.Aetna] },
      {id : IssuerType.Passport, value : IssuerType[IssuerType.Passport] },
      {id : IssuerType.Wellcare, value : IssuerType[IssuerType.Wellcare] },
      {id : IssuerType.HumanaCareSource, value : IssuerType[IssuerType.HumanaCareSource] },
      {id : IssuerType.Anthem, value : IssuerType[IssuerType.Anthem] }
    ];
  }

  openModal(content, ClickedTransactionId) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });

    this.modalTransactionDetails = this.paymentFilteredRecords.filter(function (el) {
      return el.transactionId === ClickedTransactionId
    });

    this.modalTransactionDetails.forEach(item => {
      item.hidden = true;
    });
  }

  ShowDetails(item) {
    this.modalTransactionDetails.forEach(item => {
      item.hidden = true;
    });
    item.hidden = false;
  }

  HideDetails(item) {
    item.hidden = true;
  }

  getSearchResults(entity : PaymentSearchTransaction)
  {
    this.spinner.show();
    console.log(entity.caseNumber);
    this.showSearchResults = true;

    this.paymentFilteredRecords = [];

    this.transactionService.searchPayment(+entity.caseNumber , 'MCO')
    .then(
      (res) => 
      { 
        { 
          this.logger.Log(res, Loglevel.Warning);
          res.forEach(element => {
            this.paymentFilteredRecords.push(
  
              {
                transactionId: element.transactionId,
                transactionType : element.transactionType,
                caseNumber : element.caseNumber,
                coverageMonth: element.coverageMonth,
                dueDate: element.dueDate,
                issuerId: element.issuerId,
                invoiceDate: element.invoiceDate,
                paymentDate: element.paymentDate,
                paymentStatus: element.paymentStatus,
                premiumAmount: element.premiumAmount,
                processedByIEES: element.processedByIEES,
                processedByMCO: element.processedByMCO
              }
            );
            });
  
  
            this.spinner.hide();
            console.log(this.paymentFilteredRecords);
  
        }
      }
    )
    .catch(
      (res) => { 
        this.logger.Log(res, Loglevel.Error); 
        this.spinner.hide();
      }
    )
  }

  SubmitDetails(item)
{
  console.log(item);
  console.log(this.userName);
  if(this.userName === 'iees' && item.processedByIEES === 'Y')
  {
    if(item.transactionType === 'Invoice')
    {
      console.log(item);
      this.transactionService.updatePayment(item.caseNumber, 'IEES')
      .then(result =>
        {
          console.log(result);
          console.log(result.status);
         // alert("submission successful");
         this._service.create('Success','"Invoice processed successfully"',NotificationType.Success);
       
        })
      .catch(error => {
        console.log(error);
        console.log(error.status);
        this._service.create('Error','"Something went wrong. Unable to submit transaction.!"',NotificationType.Error);
     
      });
    }
  }
}
}
