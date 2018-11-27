import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../shared/services/data.service';
import { PaymentSearchTransaction } from 'src/app/shared/models/transaction/payment-search';
import { Property } from '../property';
import { IssuerType } from 'src/app/shared/models/transaction/issuer-type.enum';
import TransactionType from 'src/app/shared/models/transaction/transaction-type.enum';

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

  constructor(private data: DataService, private modalService: NgbModal) { }

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

  // GetInvoiceTransaction() {
  //   this.showSearchResults = true;
  //   this.rawSearchResults = this.data.getSearchResult();

  //   this.invoiceFilteredRecords = this.rawSearchResults.filter(function (el) {
  //     return el.TransactionType == "Invoice"
  //   });
  // }

  openModal(content, ClickedTransactionId) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });

    this.modalTransactionDetails = this.rawSearchResults.filter(function (el) {
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
    console.log(entity.caseNumber);
    this.showSearchResults = true;
    this.rawSearchResults = this.data.getInvoiceAndPaymentData().filter(function(el){
      return el.transactionType === TransactionType.Invoice
    })
    
    this.invoiceFilteredRecords = this.rawSearchResults.filter(function(el){
      return el.caseNumber == entity.caseNumber;
    });
  }

}
