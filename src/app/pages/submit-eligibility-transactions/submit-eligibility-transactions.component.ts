import { Component, OnInit } from '@angular/core';
import {Guid } from "guid-typescript";
import {Property} from '../property';
import { EligibilityTransaction } from 'src/app/shared/models/transaction/eligibility';
import TransactionType from 'src/app/shared/models/transaction/transaction-type.enum';
import { IssuerType } from 'src/app/shared/models/transaction/issuer-type.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';

@Component({
  selector: 'app-submit-eligibility-transactions',
  templateUrl: './submit-eligibility-transactions.component.html',
  styleUrls: ['./submit-eligibility-transactions.component.scss']
})

export class SubmitEligibilityTransactionsComponent implements OnInit {

    constructor( private transactionservice: TransactionService, private spinner: NgxSpinnerService) {

    }

    currentTab = 'basic';

    issuerList: Property[];
    processingStatus: Property[];
    kyhPlanType: any;
    genderStatus: any;

    eligibilityEntity: EligibilityTransaction;




    submitPrev() {
      this.currentTab = 'basic';
    }
   


    ngOnInit() {
      // this.basicInfoEntity.transactionId = Guid.create();

      this.eligibilityEntity = {
        transactionId : Guid.create(),
        caseNumber : undefined,
        transactionType : TransactionType.Eligibility,
        maidCardNumber: undefined,
        ssn: undefined,
        firstName: undefined,
        lastName: undefined,
        dateOfBirth: undefined,
        gender: undefined,
        addressLine: undefined,
        city: undefined,
        stateCode: undefined,
        zipCode: undefined,
        caseCountableIncome: undefined,
        programCode: undefined,
        statusCode: undefined,
        imidCode: undefined,
        eligibilityStartDate: undefined,
        eligibilityEndDate: undefined,
        enrollmentStartDate: undefined,
        enrollmentEndDate: undefined,
        issuerId: undefined,
        eligibilityType: undefined,
        kyhPlanType: undefined,
        kyhPremiumPlanCode: undefined,
        kyhCopayIndicator: undefined,
        kyhPregnancyIndicator: undefined,
        kyhIndStartDate: undefined,
        kyhIndEndDate: undefined,
        kyhPremiumAmt: undefined,
        kyhPremiumStartDate: undefined,
        kyhPremiumEndDate: undefined,
        processedByMMIS: undefined,
        processedByMCO: undefined,
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
          console.log(result);
          console.log(result.status);
          this.spinner.hide();
          alert("Submit successful.");
        })
      .catch(error => {
        console.log(error);
        this.spinner.hide();
        console.log(error.status);
        alert("Something went wrong. Unable to submit transaction.!");
      });
    }

}
