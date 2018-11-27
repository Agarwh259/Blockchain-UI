import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../shared/services/data.service';
import { Property } from '../property';
import { EligibilitySearchTransaction } from 'src/app/shared/models/transaction/eligibility-search';
import { IssuerType } from 'src/app/shared/models/transaction/issuer-type.enum';
import TransactionType from 'src/app/shared/models/transaction/transaction-type.enum';

@Component({
  selector: 'app-search-eligibility-transactions',
  templateUrl: './search-eligibility-transactions.component.html',
  styleUrls: ['./search-eligibility-transactions.component.scss'],
  providers: [DataService]
})
export class SearchEligibilityTransactionsComponent implements OnInit {

  showSearchResults = false;
  rawSearchResults = [];
  eligibilityFilteredRecords = [];
  modalTransactionDetails = [];
  userName:any;

  issuerList : Property[];
  processingStatus : Property[];

  searchEligibilityEntity : EligibilitySearchTransaction;

  constructor(private data : DataService, private modalService: NgbModal) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('Role').toLowerCase();
    this.searchEligibilityEntity = {
      caseNumber : undefined,
      issuerId : undefined,
      createDate : undefined,
      maidCardNumber : undefined,
      processedByMMIS : undefined,
      processedByMCO : undefined,
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

  // GetEligibilityTransaction()
  // {
  //   this.showSearchResults = true;
  //   this.rawSearchResults = this.data.getSearchResult();

  //   this.eligibilityFilteredRecords = this.rawSearchResults.filter(function (el) {
  //     return el.TransactionType == TransactionType.Eligibility
  //   });
  // }

  openModal(content, ClickedTransactionId) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });

    this.modalTransactionDetails = this.rawSearchResults.filter(function (el) {
      return el.transactionId == ClickedTransactionId
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

  getSearchResults(entity : EligibilitySearchTransaction)
  {
    this.showSearchResults = true;
    this.rawSearchResults = this.data.getEligibilityData().filter(function(el){
      return el.transactionType === TransactionType.Eligibility
    })
    
    this.eligibilityFilteredRecords = this.rawSearchResults.filter(function(el){
      return el.caseNumber == entity.caseNumber;
    });
  }


}
