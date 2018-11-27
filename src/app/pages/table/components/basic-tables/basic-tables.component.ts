import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../../../shared/services/data.service';

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

  constructor(private data: DataService, private modalService: NgbModal) { }

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

    // this.default_data = [
    //   { caseNumber: '34532423', maidnumber: '123534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '14532423', maidnumber: '133534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '24532423', maidnumber: '953534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '64532423', maidnumber: '753534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '74532423', maidnumber: '433534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '94532423', maidnumber: '653534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '24532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" },
    //   { caseNumber: '34532423', maidnumber: '253534543535', issuerId: '234234',elgStart:'02/01/2016',enrlStart:'02/02/2016',trasId:'ea54ca7f-2615-4d81-a0c6-653a458e352c',createDate: '02/02/2018',transactionType:"Eligibility" }

    // ];

    // this.default_iees_data = [
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '14532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '24532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '64532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '74532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '94532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '24532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' },
    //   { caseNumber: '34532423', coveragemonth: '02/01/2016', PremiumAmount: '234234/-', trasId: 'ea54ca7f-2615-4d81-a0c6-653a458e352c', createDate: '02/02/2018' }

    // ];
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

}
