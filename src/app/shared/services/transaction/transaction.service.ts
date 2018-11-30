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
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestBody } from '../../models/transaction/requestbody';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class TransactionService implements TransactionManager, Organization {
  orgCode: String;
  orgTitle: String;
  private readonly _logger: LoggerService;
  private readonly _tokenManager: TokenmanagerService;
  tranId: Guid;
  /**
   * Creates a new icls
   * nstance of the TransactionService
   * @param urlmanager contains all the endpoints of the blockchain API/Couchdb
   * @param logger provides an interface to log a message to the console
   */
  constructor(
    private urlmanager: UrlmanagerService,
    private http: HttpClient,
    logger: LoggerService,
    tokenmanager: TokenmanagerService
  ) {
    this._logger = logger;
    this._logger.Log('Instantiating TransactionService', Loglevel.Info);
    this._tokenManager = tokenmanager;
  }

  private transactions: Transaction[];
  private _jwtCode: String;
  private headers: HttpHeaders;
  private requestBody: RequestBody;
  /**
   * Calls the blockchain API to add the transaction
   * @param transaction that the user wants to submit on to the blockchain
   */
  submit(transaction: Transaction): Promise<any> {
    this._logger.Log(
      'Submitting the Transaction : ' + transaction);
      let returnPromise ;
    // call the blockchain API to submit the transaction
    switch (transaction.transactionType) {
      case TransactionType.Invoice:
      returnPromise = this.submitInvoice(transaction as PaymentTransaction);
        break;

      default:
      returnPromise = this.submitEligibility(transaction as EligibilityTransaction);
        break;
    }

    return returnPromise;
  }

  private setOrganization(orgCode: String) {
    this.orgCode = orgCode;
  }

  private getWebToken() {
    this._jwtCode = this._tokenManager.getToken(this.orgCode);
  }

 private submitEligibility(transaction: EligibilityTransaction): Promise<any> {

  // tslint:disable-next-line:no-debugger

  this.setOrganization('IEES');
    this.getWebToken();

    // Construct the request header

    this.setHeaders();

    this.tranId = transaction.transactionId;
    const tranIdasString = this.tranId.toString();
    // Log the transactionId for verification.
    this._logger.Log(this.tranId, Loglevel.Info);
    // Construct the request body
    this.requestBody = new RequestBody();
    this.requestBody.peers = [
      'peer0.iees.medicaid.com',
      'peer1.iees.medicaid.com'
    ];
    this.requestBody.fcn = 'CreateF3Request';

    // tslint:disable-next-line:quotemark
    // tslint:disable-next-line:max-line-length
    // const args = ["{\"transactionId\":\"7eb11e46-e29a-4dac-9b08-2681d789eb1f\",\"transactionType\":\"Eligibility\",\"maidCardNumber\":2000000001,\"caseNumber\":1090909090,\"SSN\":123456789,\"firstName\":\"John\",\"lastName\":\"Doe\",\"dateOfBirth\":\"1980-01-01\",\"gender\":\"M\",\"addressLine1\":\"123 Main St\",\"city\":\"Lexington\",\"stateCode\":\"KY\",\"zipCode\":40509,\"caseCountableIncome\":999,\"programCode\":\"XA\",\"statusCode\":\"X3\",\"IMIDCode\":\"X3\",\"eligibilityStartDate\":\"2019-01-01\",\"eligibilityEndDate\":\"9999-12-31\",\"enrollmentStartDate\":\"2019-01-01\",\"enrollmentEndDate\":\"9999-12-31\",\"issuerId\":70001,\"eligibilityType\":\"C\",\"KYHplanType\":\"A\",\"KYHPremiumPlanCode\":\"Y\",\"KYHCopayIndicator\":\"N\",\"KYHPregnancyIndicator\":\"N\",\"KYHIndStartDate\":\"2019-01-01\",\"KYHIndEndDate\":\"9999-12-31\",\"KYHPremiumAmt\":15,\"KYHPremiumStartDate\":\"2019-01-01\",\"KYHPremiumEndDate\":\"9999-12-31\",\"processedByMMIS\":\"N\",\"processedByMCO\":\"N\"}"] ;

    const reqBodyJSON = {
      transactionId: tranIdasString as string,
      transactionType: transaction.transactionType as string,
      maidCardNumber: +transaction.maidCardNumber,
      caseNumber: +transaction.caseNumber,
      SSN: +transaction.ssn,
      firstName: transaction.firstName as string,
      lastName: transaction.lastName,
      dateOfBirth: transaction.dateOfBirth,
      gender: transaction.gender,
      addressLine1: transaction.addressLine,
      city: transaction.city,
      stateCode: transaction.stateCode,
      zipCode: +transaction.zipCode,
      caseCountableIncome: +transaction.caseCountableIncome,
      programCode: transaction.programCode,
      statusCode: transaction.statusCode,
      IMIDCode: transaction.imidCode,
      eligibilityStartDate: transaction.eligibilityStartDate,
      eligibilityEndDate: transaction.eligibilityEndDate,
      enrollmentStartDate: transaction.enrollmentStartDate,
      enrollmentEndDate: transaction.enrollmentEndDate,
      issuerId: +transaction.issuerId,
      eligibilityType: transaction.eligibilityType,
      KYHplanType: transaction.kyhPlanType,
      KYHPremiumPlanCode: transaction.kyhPremiumPlanCode,
      KYHCopayIndicator: transaction.kyhCopayIndicator,
      KYHPregnancyIndicator: transaction.kyhPregnancyIndicator,
      KYHIndStartDate: transaction.kyhIndStartDate,
      KYHIndEndDate: transaction.kyhIndEndDate,
      KYHPremiumAmt: +transaction.kyhPremiumAmt,
      KYHPremiumStartDate: transaction.kyhPremiumStartDate,
      KYHPremiumEndDate: transaction.kyhPremiumEndDate,
      processedByMMIS: 'N',
      processedByMCO: 'N'
    };

    // const reqBodyString = JSON.stringify(reqBodyJSON).replace(/'/g, "\\'") ;

    // this.requestBody.args = [ reqBodyString ];

    this.setRequestBody(reqBodyJSON);
    // We have the transaction and the web token. Now,we can make the Http Call.

    return this.callHyperLedger(
      this.urlmanager.submitEligibility.toString(),
      this.requestBody,
      this.headers
    );
  }



  private submitInvoice(transaction: PaymentTransaction): any {
    this.setOrganization('MCO');
    this.getWebToken();

    // Construct the request header

    this.setHeaders();

    this.tranId = transaction.transactionId;
    // Log the transactionId for verification.
    this._logger.Log(this.tranId, Loglevel.Info);
    // Construct the request body
    this.requestBody = new RequestBody();
    this.requestBody.peers = [
      'peer0.mco.medicaid.com',
      'peer1.mco.medicaid.com'
    ];
    this.requestBody.fcn = 'GenerateInvoice';

    const requestBodyJSON = {
      transactionId: this.tranId.toString(),
      transactionType: transaction.transactionType,
      caseNumber: +transaction.caseNumber,
      coverageMonth: transaction.coverageMonth,
      invoiceDate: transaction.invoiceDate,
      issuerId: +transaction.issuerId,
      dueDate: transaction.dueDate,
      premiumAmount: +transaction.premiumAmount,
      paymentStatus: transaction.paymentStatus,
      paymentDate: (transaction.paymentDate === undefined)?'':transaction.paymentDate,
      processedByIEES: 'N',
      processedByMCO: 'N'
    };

    this.setRequestBody(requestBodyJSON);
    return this.callHyperLedger(
      this.urlmanager.submitPayment.toString(),
      this.requestBody,
      this.headers
    );
  }

  private setRequestBody(requestBodyJSON: any) {
    const reqBodyString = JSON.stringify(requestBodyJSON).replace(/'/g, '\\\'');
    this.requestBody.args = [reqBodyString];
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
  updatePayment(casenumber: Number, organization: String, paymentDate?: Date): any {
    organization = organization.toUpperCase();
    this.setOrganization(organization);
    this.getWebToken();


    // Construct the request header

    this.setHeaders();
     // Construct the request body
     this.requestBody = new RequestBody();
     let flag = 'processedByIEES';
     switch (organization) {
       case 'IEES':
       this.requestBody.peers =  ['peer0.iees.medicaid.com', 'peer1.iees.medicaid.com'];
         break;

       default: this.requestBody.peers = ['peer0.mco.medicaid.com', 'peer1.mco.medicaid.com'];
       flag = 'processedByMCO';
         break;
     }

     this.requestBody.fcn = 'UpdateInvoiceAndPayment';
     this.requestBody.args = [casenumber.toString(), flag];
     return this.callHyperLedger(this.urlmanager.submitPayment.toString(), this.requestBody, this.headers );
  }

  private setHeaders() {
    this.headers = new HttpHeaders()
      .set('Authorization', ('Bearer ' + this._jwtCode) as string)
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Credentials', 'true');
  }

  /**
   * Calls the blockchain API to update the F3
   * returns True if the update is successful
   * @param transaction that needs to be updated
   */
  updateEligibility(casenumber: Number, organization: String, paymentDate?: Date): any {
    organization = organization.toUpperCase();
    this.setOrganization(organization);
    this.getWebToken();


    // Construct the request header

    this.setHeaders();
     // Construct the request body
     this.requestBody = new RequestBody();
     let flag = 'processedByMMIS';
     switch (organization) {
       case 'MMIS':
       this.requestBody.peers =  ['peer0.mmis.medicaid.com', 'peer1.mmis.medicaid.com'];
         break;

       default: this.requestBody.peers = ['peer0.mco.medicaid.com', 'peer1.mco.medicaid.com'];
       flag = 'processedByMCO';
         break;
     }

     this.requestBody.fcn = 'UpdateF3Request';
     this.requestBody.args = [casenumber.toString(), flag];

     return this.callHyperLedger(this.urlmanager.submitPayment.toString(), this.requestBody, this.headers );
  }

  private callHyperLedger(url: String, body: any, requestHeaders: HttpHeaders) {
    const Url = 'Url: ' + url;
    const reqBody = 'Request Body: ' + JSON.stringify(body);
    const Headers = 'Request Headers: ' + JSON.stringify(requestHeaders);
    this._logger.Log(Url, Loglevel.Info);
    this._logger.Log(reqBody, Loglevel.Info);
    this._logger.Log(Headers, Loglevel.Info);
    return this.http.post(url as string, body, { headers: requestHeaders, responseType : 'text' },).
      toPromise();

  }

  searchEligibility(casenumber: Number, organization: String): any {
    this.setOrganization(organization);
    this.getWebToken();
    this.setHeaders();
    const richQuery = JSON.stringify({
      'selector': {
        'caseNumber': {
          '$eq': +casenumber
        }
      }
    });
    this._logger.Log(richQuery);

    const params1 = new HttpParams()
      .set('peer', 'peer0.iees.medicaid.com')
      .set('fcn', 'GetDataByCustomFilter')
      .append('args', JSON.stringify([richQuery]));
    return this.queryHyperLedger(
      this.urlmanager.submitEligibility.toString(),
      params1
    );
  }
  searchPayment(casenumber: Number, organization: String): any {
    const caseToSearch = JSON.stringify(casenumber);
    this.setOrganization(organization);
    this.getWebToken();
    this.setHeaders();
    const params = new HttpParams()
      .set('peer', 'peer0.mco.medicaid.com')
      .set('fcn', 'QueryInvoice')
      .append('args', JSON.stringify([caseToSearch]));
    return this.queryHyperLedger(this.urlmanager.baseUrl.toString(), params);
  }

  private queryHyperLedger(url: String, requestParams: HttpParams) {
    // this._logger.Log(Url, Loglevel.Info);
    // this._logger.Log(Parameters, Loglevel.Info);
    return this.http
      .get(url as string, { headers: this.headers, params: requestParams })
      .toPromise();
  }
}
