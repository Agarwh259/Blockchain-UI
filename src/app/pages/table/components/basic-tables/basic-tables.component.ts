import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../../../shared/services/data.service';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';

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
  dummyData = [];

  constructor(private data: DataService, private modalService: NgbModal, private transactionservice: TransactionService) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('Role').toLowerCase();

    if (this.userName === 'mmis') {
      this.dummyData = this.data.getEligibilityData().filter(function (el) {
        return el.processedByMMIS == 'N'
      });
    }
    if (this.userName === 'mco') {
      this.dummyData = this.data.getEligibilityData().filter(function (el) {
        return (el.processedByMCO === 'N' && el.processedByMMIS === 'Y')
      });
    }
    if (this.userName === 'iees') {
      this.dummyData = this.data.getInvoiceAndPaymentData().filter(function (el) {
        return (el.processedByIEES === 'N')
      });
    }
  }

  openModal(content, ClickedTransactionId) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });

    this.modalTransactionDetails = this.dummyData.filter(function (el) {
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

  SubmitDetails(item){
    debugger;
    if(this.userName == 'mco' && item.processedByMCO == 'Y')
    {
      if(item.transactionType == 'Eligibility')
      {
        this.transactionservice
      .updateEligibility(item.caseNumber, this.userName)
      .then(result =>
        {
          console.log(result);
          console.log(result.status);
        })
      .catch(error => {
        console.log(error);
        console.log(error.status);
      });
      }  
      else if(item.transactionType == 'Payment')
      {
        this.transactionservice
      .updatePayment(item.caseNumber, this.userName)
      .then(result =>
        {
          console.log(result);
          console.log(result.status);
        })
      .catch(error => {
        console.log(error);
        console.log(error.status);
      });
      }    
    }
    else if(this.userName == 'mmis' && item.processedByMMIS == 'Y')
    {
      this.transactionservice
      .updateEligibility(item.caseNumber, this.userName)
      .then(result =>
        {
          console.log(result);
          console.log(result.status);
        })
      .catch(error => {
        console.log(error);
        console.log(error.status);
      });
    }
    else if(this.userName = 'iees' && item.processedByIEES == 'Y')
    {
      this.transactionservice
      .updatePayment(item.caseNumber, this.userName)
      .then(result =>
        {
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
