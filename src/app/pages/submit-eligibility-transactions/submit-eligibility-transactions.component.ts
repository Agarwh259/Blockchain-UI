import { Component, OnInit } from '@angular/core';
import {Guid } from "guid-typescript";
import {Property} from '../property';
import { EligibilityTransaction } from 'src/app/shared/models/transaction/eligibility';
import TransactionType from 'src/app/shared/models/transaction/transaction-type.enum';
import { IssuerType } from 'src/app/shared/models/transaction/issuer-type.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';

@Component({
  selector: 'app-submit-eligibility-transactions',
  templateUrl: './submit-eligibility-transactions.component.html',
  styleUrls: ['./submit-eligibility-transactions.component.scss']
})

export class SubmitEligibilityTransactionsComponent implements OnInit {

    constructor( private transactionservice: TransactionService, private spinner: NgxSpinnerService
      ,private _service: NotificationsService) {

    }

    currentTab = 'basic';

    issuerList: Property[];
    processingStatus: Property[];
    kyhPlanType: any;
    genderStatus: any;

    public options = {
      timeOut: 5000,
      position:["top","right"]
        };

    eligibilityEntity: EligibilityTransaction;




    submitPrev() {
      this.currentTab = 'basic';
    }
   

    submitPrevElg() {
      this.currentTab = 'elg';
    }


    ngOnInit() {
      // this.basicInfoEntity.transactionId = Guid.create();

      this.eligibilityEntity = {
        transactionId : Guid.create(),
        caseNumber : undefined,
        transactionType : TransactionType.Eligibility,
        maidCardNumber: '1212121221',
        ssn: '9999818218',
        firstName: 'Berry',
        lastName: 'Allen',
        dateOfBirth: new Date('01-01-1987'),
        gender: 'M',
        addressLine: 'Kentucky',
        city: 'KY',
        stateCode: 'KY',
        zipCode: 12121,
        caseCountableIncome: 111,
        programCode: 'MA',
        statusCode: 'A',
        imidCode: 'X3',
        eligibilityStartDate: undefined,
        eligibilityEndDate: undefined,
        enrollmentStartDate: undefined,
        enrollmentEndDate: undefined,
        issuerId: 70001,
        eligibilityType: 'Y',
        kyhPlanType: 'Y',
        kyhPremiumPlanCode: 'Y',
        kyhCopayIndicator: false,
        kyhPregnancyIndicator: false,
        kyhIndStartDate: undefined,
        kyhIndEndDate: undefined,
        kyhPremiumAmt: undefined,
        kyhPremiumStartDate: undefined,
        kyhPremiumEndDate: undefined,
        processedByMMIS: 'N',
        processedByMCO: 'N',
      };

      this.issuerList = [
        {id : IssuerType.Aetna, value : IssuerType[IssuerType.Aetna] },
        {id : IssuerType.Passport, value : IssuerType[IssuerType.Passport] },
        {id : IssuerType.Wellcare, value : IssuerType[IssuerType.Wellcare] },
        {id : IssuerType.HumanaCareSource, value : IssuerType[IssuerType.HumanaCareSource]},
        {id : IssuerType.Anthem, value : IssuerType[IssuerType.Anthem] }
      ];

      this.processingStatus = [
        {id : 'Y', value : 'Yes' },
        {id : 'N', value : 'No' },
      ];

      this.genderStatus = [
          {id: 'M', value: 'Male'},
          {id: 'F', value: 'Female'},
          {id: 'U', value: 'Other'}
      ];

      this.kyhPlanType = [
        {
          id: 'S', value: 'S'
        },
        {
          id: 'A', value: 'A'
        }
      ];
    }

    submitBasicInfo(entity: EligibilityTransaction): void {
      this.currentTab = 'elg';
      console.log(entity);
    }

    submitElgInfo(entity: EligibilityTransaction): void {
      this.currentTab = 'kyh';
      console.log(entity);
    }
    submitKyhInfo(entity: EligibilityTransaction): void {
      console.log(entity);
      this.spinner.show();
      
      console.log(this.transactionservice.submit(entity));
      this.transactionservice
      .submit(entity)
      .then(result =>
        {
          console.log("Inside then :");
          console.log(result);
         console.log(result.status);
          this.spinner.hide();
          this._service.create('Success','"Eligibility submitted successfully"',NotificationType.Success);
        })
      .catch(error => {
        
        console.log("Inside catch :");
        console.log(error);
        this.spinner.hide();
        console.log(error.status);
        this._service.create('Error','"Something went wrong. Unable to submit transaction.!"',NotificationType.Error);
      });
    }

}
