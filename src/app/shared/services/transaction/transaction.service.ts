import { Injectable } from '@angular/core';
import { TransactionManager } from '../../models/transaction/transaction-manager';
import { Transaction } from '../../models/transaction/transaction';
import { LoggerService } from '../logging/logger.service';
import Loglevel from '../../models/logging/loglevel.enum';
import { UrlmanagerService } from './urlmanager.service';
import { TokenmanagerService } from './tokenmanager.service';
import TransactionType from '../../models/transaction/transaction-type.enum';
import { PaymentTransaction } from '../../models/transaction/payment';
import { EligibilityTransaction } from '../../models/transaction/eligibility';
import { Organization } from '../../models/user/organization';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestBody } from '../../models/transaction/requestbody';


@Injectable({
  providedIn: 'root'
})
export class TransactionService implements TransactionManager, Organization {
  orgCode: String;
  orgTitle: String;
  private readonly _logger: LoggerService;
  private readonly _tokenManager: TokenmanagerService;
  /**
   * Creates a new instance of the TransactionService
   * @param urlmanager contains all the endpoints of the blockchain API/Couchdb
   * @param logger provides an interface to log a message to the console
   */
  constructor(private urlmanager: UrlmanagerService, private http: HttpClient, logger: LoggerService, tokenmanager: TokenmanagerService) {
  this._logger = logger;
    this._logger.Log('Instantiating TransactionService', Loglevel.Info);
    this._tokenManager = tokenmanager;
  }

  private transactions: Transaction[];
  private _jwtCode: String;
  private _organization: Organization;
  private headers: HttpHeaders;
  private contentTypeKey: String = 'Content-Type';
  private contentTypeValue: String = 'application/json';
  private requestBody: RequestBody;
  /**
   * Calls the blockchain API to add the transaction
   * @param transaction that the user wants to submit on to the blockchain
   */
  submit(transaction: Transaction): Boolean {
    this._logger.Log(
      'Submitting the Transaction : ' + transaction);
    // call the blockchain API to submit the transaction
    switch (transaction.transactionType) {
      case TransactionType.Invoice:
        this.submitInvoice(transaction);
        break;
    case TransactionType.Payment: this.submitPayment(transaction as PaymentTransaction); break;
      default: this.submitEligibility(transaction as EligibilityTransaction);
        break;
    }
    return true;
  }
  private submitPayment(transaction: PaymentTransaction): any {
    this.setOrganization('MCO');
    this.getWebToken();

  }
  private setOrganization(orgCode: String) {
    this.orgCode = orgCode;
  }

  private getWebToken() {
    this._jwtCode = this._tokenManager.getToken(this.orgCode);
  }

 private submitEligibility(transaction: EligibilityTransaction): any {
    this.setOrganization('IEES');
    this.getWebToken();

    // Construct the request header

   this.headers = new HttpHeaders().set('JWT', this._jwtCode as string)
   .set('Content-Type', 'application/json');

    // Construct the request body
    this.requestBody = new RequestBody();
    this.requestBody.peers = ['peer0.iees.medicaid.com', 'peer1.iees.medicaid.com'];
    this.requestBody.fcn = 'CreateF3Request';
    this.requestBody.args = [ {
      transactionId: transaction.transactionId,
      transactionType: transaction.transactionType,
      maidCardNumber: transaction.maidCardNumber,
      caseNumber: transaction.caseNumber,
      SSN: transaction.ssn,
      firstName: transaction.firstName,
      lastName: transaction.lastName,
      dateOfBirth: transaction.dateOfBirth,
      gender: transaction.gender,
      addressLine1: transaction.addressLine,
      city: transaction.city,
      stateCode: transaction.stateCode,
      zipCode: transaction.zipCode,
      caseCountableIncome: transaction.caseCountableIncome,
      programCode: transaction.programCode,
      statusCode: transaction.statusCode,
      IMIDCode: transaction.imidCode,
      eligibilityStartDate: transaction.eligibilityStartDate,
      eligibilityEndDate: transaction.eligibilityEndDate,
      enrollmentStartDate: transaction.enrollmentStartDate,
      enrollmentEndDate: transaction.enrollmentEndDate,
      issuerId: transaction.issuerId,
      eligibilityType: transaction.eligibilityType,
      KYHplanType: transaction.kyhPlanType,
      KYHPremiumPlanCode: transaction.kyhPremiumPlanCode,
      KYHCopayIndicator: transaction.kyhCopayIndicator,
      KYHPregnancyIndicator: transaction.kyhPregnancyIndicator,
      KYHIndStartDate: transaction.kyhIndStartDate,
      KYHIndEndDate: transaction.kyhIndEndDate,
      KYHPremiumAmt: transaction.kyhPremiumAmt,
      KYHPremiumStartDate: transaction.kyhPremiumStartDate,
      KYHPremiumEndDate: transaction.kyhPremiumEndDate,
      processedByMMIS: transaction.processedByMMIS,
      processedByMCO: transaction.processedByMCO
  }];

    // We have the transaction and the web token. Now,we can make the Http Call.

    // log

    const Url = 'Url: ' + this.urlmanager.submitEligibility.toString();
    const reqBody = 'Request Body: ' + JSON.stringify(this.requestBody);
    const Headers = 'Request Headers: ' + this.headers;
    this._logger.Log( Url, Loglevel.Info);
    this._logger.Log(reqBody, Loglevel.Info);
    this._logger.Log(Headers, Loglevel.Info);
    this.http.post(this.urlmanager.submitEligibility.toString(), this.requestBody, { headers: this.headers } );
  }
  private submitInvoice(transaction: Transaction): any {
    this.setOrganization('MCO');
    this.getWebToken();
  }

  /**
   * Calls the blockchain API to get all the transactions
   * associated with the given casenumber
   * @param casenumber with which the user wants to find the transactions
   */
  search(casenumber: Number): Transaction[] {
    this._logger.Log('Casenumber : ' + casenumber);
    // Make the API call here...
    return this.transactions;
  }

  /**
   * Calls the blockchain API to update the transaction
   * returns True if the update is successful
   * @param transaction that needs to be updated
   */
  update(transaction: Transaction): Boolean {
    this._logger.Log('Updating Transaction : ' + transaction);
    // make a call the blockchain API/ Couchdb API
    return true;
  }
}
