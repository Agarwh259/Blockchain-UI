import { Transaction } from './transaction';

export interface EligibilityTransaction extends Transaction {
    maidCardNumber: String;
    ssn: String;
    firstName: String;
    lastName: String;
    dateOfBirth: Date;
    gender: String;
    addressLine: String;
    city: String;
    stateCode: String;
    zipCode: Number;
    caseCountableIncome: Number;
    programCode: String;
    statusCode: String;
    imidCode: String;
    eligibilityStartDate: Date;
    eligibilityEndDate?: Date;
    enrollmentStartDate: Date;
    enrollmentEndDate?: Date;
    issuerId: Number;
    eligibilityType: String;
    kyhPlanType: String;
    kyhPremiumPlanCode: String;
    kyhCopayIndicator: Boolean;
    kyhPregnancyIndicator: Boolean;
    kyhIndStartDate?: Date;
    kyhIndEndDate?: Date;
    kyhPremiumAmt: Number;
    kyhPremiumStartDate?: Date;
    kyhPremiumEndDate?: Date;
    processedByMMIS: Boolean;
    processedByMCO: Boolean;
}
