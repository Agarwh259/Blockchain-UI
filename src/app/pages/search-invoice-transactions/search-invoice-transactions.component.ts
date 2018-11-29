import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../shared/services/data.service';
import { PaymentSearchTransaction } from 'src/app/shared/models/transaction/payment-search';
import { Property } from '../property';
import { IssuerType } from 'src/app/shared/models/transaction/issuer-type.enum';
import TransactionType from 'src/app/shared/models/transaction/transaction-type.enum';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';
import { LoggerService } from 'src/app/shared/services/logging/logger.service';
import Loglevel from 'src/app/shared/models/logging/loglevel.enum';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search-invoice-transactions',
  templateUrl: './search-invoice-transactions.component.html',
  styleUrls: ['./search-invoice-transactions.component.scss'],
  providers: [DataService]
})
export class SearchInvoiceTransactionsComponent implements OnInit {

  showSearchResults = false;
  rawSearchResults = [];
  invoiceFilteredRecords = [];
  modalTransactionDetails = [];
  userName : any;

  issuerList : Property[];
  processingStatus : Property[];

  searchInvoiceEntity : PaymentSearchTransaction;

  constructor(private spinner: NgxSpinnerService,private data: DataService, private modalService: NgbModal,
    private transactionService: TransactionService,private logger: LoggerService) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('Role').toLowerCase();

    this.searchInvoiceEntity = {
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

    this.modalTransactionDetails = this.invoiceFilteredRecords.filter(function (el) {
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

    this.invoiceFilteredRecords = [];

    this.transactionService.searchPayment(+entity.caseNumber , 'MCO')
    .then(
      (res) => { this.logger.Log(res, Loglevel.Warning);
        this.invoiceFilteredRecords.push(
          {
            transactionId : res.transactionId,
            transactionType : res.transactionType,
            caseNumber : res.caseNumber,
            coverageMonth: res.coverageMonth,
            issuerId: res.issuerId,
            invoiceDate: res.invoiceDate,
            dueDate: res.dueDate,
            premiumAmount: res.premiumAmount,
            paymentStatus: res.paymentStatus,
            paymentDate : res.paymentDate,
            processedByIEES: res.processedByIEES,
            processedByMCO: res.processedByMCO
          }         
        );
        this.spinner.hide();
        }
    )
    .catch(
      (res) => { 
        this.logger.Log(res, Loglevel.Error); 
        this.spinner.hide();
      }
    )
  }

}
