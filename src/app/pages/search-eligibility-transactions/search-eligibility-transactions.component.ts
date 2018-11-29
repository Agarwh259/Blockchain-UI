import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../shared/services/data.service';
import { Property } from '../property';
import { EligibilitySearchTransaction } from 'src/app/shared/models/transaction/eligibility-search';
import { IssuerType } from 'src/app/shared/models/transaction/issuer-type.enum';
import TransactionType from 'src/app/shared/models/transaction/transaction-type.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';
import { LoggerService } from 'src/app/shared/services/logging/logger.service';
import Loglevel from 'src/app/shared/models/logging/loglevel.enum';
import { EligibilityTransaction } from 'src/app/shared/models/transaction/eligibility';

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

  constructor(private data : DataService, private modalService: NgbModal,
    private spinner: NgxSpinnerService, private transactionService: TransactionService , private logger: LoggerService ) { }

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

  openModal(content, ClickedTransactionId) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });

    this.modalTransactionDetails = this.eligibilityFilteredRecords.filter(function (el) {
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
    this.eligibilityFilteredRecords = [];
    this.transactionService.searchEligibility( +entity.caseNumber , 'IEES').then(

      (res) => { this.logger.Log(res, Loglevel.Warning);


          this.eligibilityFilteredRecords.push(

            {
              transactionId: res.transactionId,
              transactionType : res.transactionType,
              maidCardNumber: res.maidCardNumber,
              caseNumber : res.caseNumber,
              ssn: res.SSN,
              firstName: res.firstName,
              lastName: res.lastName,
              dateOfBirth: res.dateOfBirth,
              gender: res.gender,
              addressLine: res.addressLine1,
              city: res.city,
              stateCode: res.stateCode,
              zipCode: res.zipCode,
              caseCountableIncome: res.caseCountableIncome,
              programCode: res.programCode,
              statusCode: res.stateCode,
              imidCode: res.IMIDCode,
              eligibilityStartDate: res.eligibilityStartDate,
              eligibilityEndDate: res.eligibilityEndDate,
              enrollmentStartDate: res.enrollmentStartDate,
              enrollmentEndDate : res.enrollmentEndDate,
              issuerId: res.issuerId,
              eligibilityType: res.eligibilityType,
              kyhPlanType: res.KYHplanType,
              kyhPremiumPlanCode: res.KYHPremiumPlanCode,
              kyhCopayIndicator: res.KYHCopayIndicator,
              kyhPregnancyIndicator: res.KYHPregnancyIndicator,
              kyhIndStartDate: res.KYHIndStartDate,
              kyhIndEndDate: res.KYHIndEndDate,
              kyhPremiumAmt: res.KYHPremiumAmt,
              kyhPremiumStartDate : res.KYHPremiumStartDate,
              kyhPremiumEndDate : res.KYHPremiumEndDate,
              processedByMMIS: res.processedByMMIS,
              processedByMCO: res.processedByMCO
            }
          );

          this.spinner.hide();

      }
    ).catch(

      (res) => { this.logger.Log(res, Loglevel.Error); }
    );


    // this.eligibilityFilteredRecords = this.rawSearchResults.filter(function(el){
    //   return el.caseNumber == entity.caseNumber;
    // });

    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
  }, 5000);

}


}
