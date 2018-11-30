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
import { NotificationsService, NotificationType } from 'angular2-notifications';
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
  userName: any;

  issuerList: Property[];
  processingStatus: Property[];

  searchEligibilityEntity: EligibilitySearchTransaction;

  constructor(private data: DataService, private modalService: NgbModal,
    private spinner: NgxSpinnerService, private transactionService: TransactionService ,
    private logger: LoggerService, private _service: NotificationsService ) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('Role').toLowerCase();
    this.searchEligibilityEntity = {
      caseNumber : undefined,
      issuerId : undefined,
      createDate : undefined,
      maidCardNumber : undefined,
      processedByMMIS : undefined,
      processedByMCO : undefined,
    };

    this.processingStatus = [
      {id : 'Y', value : 'Yes' },
      {id : 'N', value : 'No' },
    ];

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
      return el.transactionId === ClickedTransactionId;
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

  getSearchResults(entity: EligibilitySearchTransaction) {
    this.spinner.show();
    this.showSearchResults = true;
    this.eligibilityFilteredRecords = [];
    this.transactionService.searchEligibility( +entity.caseNumber , 'IEES').then(

      (res) => {
        this.logger.Log('Inside Result', Loglevel.Info);
        this.logger.Log(res, Loglevel.Info);

        res.forEach(element => {
          this.eligibilityFilteredRecords.push(

            {
              transactionId: element.transactionId,
              transactionType : element.transactionType,
              maidCardNumber: element.maidCardNumber,
              caseNumber : element.caseNumber,
              ssn: element.SSN,
              firstName: element.firstName,
              lastName: element.lastName,
              dateOfBirth: element.dateOfBirth,
              gender: element.gender,
              addressLine: element.addressLine1,
              city: element.city,
              stateCode: element.stateCode,
              zipCode: element.zipCode,
              caseCountableIncome: element.caseCountableIncome,
              programCode: element.programCode,
              statusCode: element.stateCode,
              imidCode: element.IMIDCode,
              eligibilityStartDate: element.eligibilityStartDate,
              eligibilityEndDate: element.eligibilityEndDate,
              enrollmentStartDate: element.enrollmentStartDate,
              enrollmentEndDate : element.enrollmentEndDate,
              issuerId: element.issuerId,
              eligibilityType: element.eligibilityType,
              kyhPlanType: element.KYHplanType,
              kyhPremiumPlanCode: element.KYHPremiumPlanCode,
              kyhCopayIndicator: element.KYHCopayIndicator,
              kyhPregnancyIndicator: element.KYHPregnancyIndicator,
              kyhIndStartDate: element.KYHIndStartDate,
              kyhIndEndDate: element.KYHIndEndDate,
              kyhPremiumAmt: element.KYHPremiumAmt,
              kyhPremiumStartDate : element.KYHPremiumStartDate,
              kyhPremiumEndDate : element.KYHPremiumEndDate,
              processedByMMIS: element.processedByMMIS,
              processedByMCO: element.processedByMCO
            }
          );
          });


          this.spinner.hide();

      }
    ).catch(

      (res) => {
        this.logger.Log('Inside Catch', Loglevel.Info);
        this.logger.Log(res, Loglevel.Error);  this.spinner.hide(); }
    );
}

SubmitDetails(item) {

  if (this.userName === 'mco' && item.processedByMCO === 'Y') {
    if (item.transactionType === 'Eligibility') {
      this.transactionService
    .updateEligibility(item.caseNumber, this.userName)
    .then(result => {
        this._service.create('Success', '"Updated successfully"', NotificationType.Success);
      })
    .catch(error => {
      this._service.create('Error', '"Something went wrong. Please try again!!"', NotificationType.Error);
    });
    } else if (item.transactionType === 'Payment') {
      this.transactionService
    .updatePayment(item.caseNumber, this.userName)
    .then(result => {
        this._service.create('Success', '"Updated successfully"', NotificationType.Success);
      })
    .catch(error => {
      this._service.create('Error', '"Something went wrong. Please try again!!"', NotificationType.Error);
    });
    }
  } else if (this.userName === 'mmis' && item.processedByMMIS === 'Y') {
    this.transactionService
    .updateEligibility(item.caseNumber, this.userName)
    .then(result => {
        this._service.create('Success', '"Updated successfully"', NotificationType.Success);
      })
    .catch(error => {
      this._service.create('Error', '"Something went wrong. Please try again!!"', NotificationType.Error);
    });
  } else if (this.userName = 'iees' && item.processedByIEES === 'Y') {
    this.transactionService
    .updatePayment(item.caseNumber, this.userName)
    .then(result => {
        this._service.create('Success', '"Updated successfully"', NotificationType.Success);
      })
    .catch(error => {
      this._service.create('Error', '"Something went wrong. Please try again!!"', NotificationType.Error);
    });
  }
}

}
