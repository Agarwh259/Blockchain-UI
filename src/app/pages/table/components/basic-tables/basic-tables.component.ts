import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../../../shared/services/data.service';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';
import { LoggerService } from 'src/app/shared/services/logging/logger.service';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-basic-tables',
  templateUrl: './basic-tables.component.html',
  styleUrls: ['./basic-tables.component.scss'],
  providers: [DataService]
})
export class BasicTablesComponent implements OnInit {
  default_data: Array<any>;
  default_iees_data: Array<any>;
  userName: any;
  modalTransactionDetails = [];
  filteredData = [];

  constructor(
    private data: DataService,
    private modalService: NgbModal,
    private transactionservice: TransactionService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.userName = sessionStorage.getItem('Role').toLowerCase();
    let role = this.userName;

    if(role === 'iees')
    {
      this.filteredData = [];

      this.transactionservice
      .getPayments()
      .then(result => {
        this.logger.Log('Inside Result');
        this.logger.Log(result);

        result.forEach(element => {
          this.filteredData.push({
            transactionId : element.transactionId,
            transactionType : element.transactionType,
            caseNumber : element.caseNumber,
            coverageMonth: element.coverageMonth,
            issuerId: element.issuerId,
            invoiceDate: element.invoiceDate,
            dueDate: element.dueDate,
            premiumAmount: element.premiumAmount,
            paymentStatus: element.paymentStatus,
            paymentDate : element.paymentDate,
            processedByIEES: element.processedByIEES,
            processedByMCO: element.processedByMCO
          });
        });

      })
      .catch(err => {
        this.logger.Log('Inside Error');
        this.logger.Log(err);
      });
    }

    if(role === 'mmis')
    {
      this.filteredData = [];
      this.transactionservice
      .getEligibility('MMIS')
      .then(result => {
        this.logger.Log('Inside Eligibility Result');
        this.logger.Log(result);

        result.forEach(element => {

          this.filteredData.push(
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
            });

        });
      })
      .catch(err => {
        this.logger.Log('Inside Eligibility Error');
        this.logger.Log(err);
      });
    }

   // this.getBlockChainData();

    if(role === 'mco')
    {
      this.transactionservice
      .getEligibility('MCO')
      .then(result => {
        this.logger.Log('Inside Eligibility Result');
        this.logger.Log(result);

        result.forEach(element => {

          this.filteredData.push(
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
            });

        });
      })
      .catch(err => {
        this.logger.Log('Inside Eligibility Error');
        this.logger.Log(err);
      });
    }
  }
  getBlockChainData(): any {

    this.transactionservice.getAllEligibility().
    then((result) => {


      this.logger.Log('Insider get all eligibility result');
      this.logger.Log(result);

      const mco_pe_count =  result.filter(tran => tran.processedByMCO === 'N').length;
      this.logger.Log(mco_pe_count);

      const mmis_pe_count =  result.filter(tran => tran.processedByMMIS === 'N').length;
      this.logger.Log(mmis_pe_count);
    } )
    .catch( (err) => {

      this.logger.Log('Insider get all eligibility error');
      this.logger.Log(err);

    });


  }

  openModal(content, ClickedTransactionId) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(result => {}, reason => {});

    this.modalTransactionDetails = this.filteredData.filter(function(el) {
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

  SubmitDetails(item) {
   // debugger;
    if (this.userName === 'mco' && item.processedByMCO === 'Y') {
      if (item.transactionType === 'Eligibility') {
        this.transactionservice
          .updateEligibility(item.caseNumber, this.userName)
          .then(result => {
            console.log(result);
            console.log(result.status);
          })
          .catch(error => {
            console.log(error);
            console.log(error.status);
          });
      } else if (item.transactionType === 'Payment') {
        this.transactionservice
          .updatePayment(item.caseNumber, 'MCO')
          .then(result => {
            console.log(result);
            console.log(result.status);
          })
          .catch(error => {
            console.log(error);
            console.log(error.status);
          });
      }
    } else if (this.userName === 'mmis' && item.processedByMMIS === 'Y') {
      this.transactionservice
        .updateEligibility(item.caseNumber, this.userName)
        .then(result => {
          console.log(result);
          console.log(result.status);
        })
        .catch(error => {
          console.log(error);
          console.log(error.status);
        });
    } else if ((this.userName = 'iees' && item.processedByIEES === 'Y')) {
      this.transactionservice
        .updatePayment(item.caseNumber, 'IEES')
        .then(result => {
          console.log(result);
          console.log(result.status);
        })
        .catch(error => {
          console.log(error);
          console.log(error.status);
        });
    }
  }
}
