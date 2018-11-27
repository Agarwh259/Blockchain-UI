import { Component, OnInit } from '@angular/core';
import {Guid } from "guid-typescript";
import {Property} from '../property';
import { BasicInfoEntity ,ElgInfoEntity,KYHInfoEntity} from '../entity';
import { EligibilityTransaction } from 'src/app/shared/models/transaction/eligibility';
import TransactionType from 'src/app/shared/models/transaction/transaction-type.enum';
import { IssuerType } from 'src/app/shared/models/transaction/issuer-type.enum';


@Component({
  selector: 'app-submit-eligibility-transactions',
  templateUrl: './submit-eligibility-transactions.component.html',
  styleUrls: ['./submit-eligibility-transactions.component.scss']
})

export class SubmitEligibilityTransactionsComponent implements OnInit {

    currentTab="basic";

    issuerList : Property[];
    processingStatus : Property[];
    kyhPlanType:any;
    genderStatus:any;

    eligibilityEntity : EligibilityTransaction;
    
    submitPrev(){
      this.currentTab="basic";
    }
    submitPrevElg(){
      this.currentTab="elg";
    }
   

  
    // basicInfoEntity : BasicInfoEntity = {
    //   transactionId:null,
    //   transactionType: null,
    //   maidCardNumber : null,
    //   caseNumber : null,
    //   ssn : null,
    //   firstName : null,
    //   lastName : null,
    //   dateOfBirth : null,
    //   gender : null,
    //   addressLine1 : null,
    //   city : null,
    //   stateCode : null,
    //   zipCode : null
    // }

    // elgInfoEntity:ElgInfoEntity = {
    //   caseCountableIncome:null,
    //   programCode:null,
    //   eligibilityEndDate:null,
    //   eligibilityStartDate:null,
    //   enrollmentEndDate:null,
    //   enrollmentStartDate:null,
    //   statusCode:null,
    //   iMIDCode:null,
    //   issuerId:null,
    //   elgType:null
    // }
  
    // kyhInfoEntity:KYHInfoEntity ={
    //   kyhPlanType:null,
    //   kyhPremiumPlanCode:null,
    //   kyhCopayIndicator:null,
    //   kyhPregnancyIndicator:null,
    //   kyhIndStartDate:null,
    //   kyhIndEndDate:null,
    //   kyhPremiumAmt:null,
    //   kyhPremiumStartDate:null,
    //   kyhPremiumEndDate:null,
    //   processedByMMIS:null,
    //   processedByMCO:null
    // }

    constructor() { 
      
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
      }

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
      ]

      this.genderStatus =[
          {id:'M',value:'Male'},
          {id:'F',value:'Female'},
          {id:'U',value:'Other'}
      ]

      this.kyhPlanType=[
        {
          id:'S',value:'S'
        },
        {
          id:'A',value:'A'
        }
      ]
    }
  
    submitBasicInfo(entity : EligibilityTransaction) : void
    {
      this.currentTab="elg";
      console.log(entity);
    }

    submitElgInfo(entity : EligibilityTransaction) : void
    {
      this.currentTab="kyh";
      console.log(entity);
    }
    submitKyhInfo(entity : EligibilityTransaction) : void
    {
      console.log(entity);
      alert("Submit Success!!")
    }
    
}