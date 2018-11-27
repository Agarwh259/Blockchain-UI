import { Guid } from "guid-typescript";

export class PaymentEntity
{
    transactionId : Guid;
    transactionType : string;
    caseNumber : number;
    coverageMonth : Date;
    issuerId : number;
    invoiceDate : Date;
    dueDate : Date;
    premiumAmount : number;
    paymentStatus : string;
    paymentDate : Date;
    processedByIEES : string;
}

export class InvoiceEntity
{
    transactionId : Guid;
    transactionType : string;
    caseNumber : number;
    coverageMonth : Date;
    issuerId : number;
    invoiceDate : Date;
    dueDate : Date;
    premiumAmount : number;
    paymentStatus : string;
    processedByIEES : string;
}

export class EligibilityEntity
{
     BasicInfoEntity;
     InvoiceEntity;
}

export class BasicInfoEntity
{
    transactionId : Guid;
    transactionType: string;
    maidCardNumber : number;
    caseNumber : number;
    ssn : number;
    firstName : string;
    lastName : string;
    dateOfBirth : Date;
    gender : string;
    addressLine1 : string;
    city : string;
    stateCode : string;
    zipCode : string;
}

export class ElgInfoEntity
{
    caseCountableIncome : number;
    programCode:string;
    statusCode:string;
    iMIDCode:string;
    eligibilityStartDate:Date;
    eligibilityEndDate:Date;
    enrollmentStartDate:Date;
    enrollmentEndDate:Date;
    issuerId:string;
    elgType:string;
}

export class KYHInfoEntity
{
    kyhPlanType : string;
    kyhPremiumPlanCode:string;
    kyhCopayIndicator:string;
    kyhPregnancyIndicator:string;
    kyhIndStartDate:Date;
    kyhIndEndDate:Date;
    kyhPremiumAmt:number;
    kyhPremiumStartDate:Date;
    kyhPremiumEndDate:Date;
    processedByMMIS:string;
    processedByMCO:string;
}

export class EligibilityEntityType
{
    transactionId : Guid;
    transactionType : string;
    maidCardNumber : string;
    caseNumber : number;
    ssn : number;
    firstName : string;
    lastName : string;
    dateOfBirth : Date;
    gender : string;
    address : string;
    city : string;
    stateCode : string;
    zipCode : number;
    caseCountableIncome : number;
    programCode : string;
    statusCode : string;
    imidCode : string;
    eligibilityStartDate : Date;
    eligibilityEndDate : Date;
    enrollmentStartDate : Date;
    enrollmentEndDate : Date;
    issuerId : number;
    eligibilityType : string;
    kyhPlanType : string;
    kyhPremiumPlanCode : string;
    kyhCopayIndicator : string;
    kyhPregnancyIndicator : string;
    kyhIndStartDate : Date;
    kyhIndEndDate : Date;
    kyhPremiumAmount : number;
    kyhPremiumStartDate : Date;
    kyhPremiumEndDate : Date;
    processedByMMIS : string;
    processedByMCO : string;
    createDate : Date;
}