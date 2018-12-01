import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';
import { TransactionData } from 'src/app/shared/models/transaction/transaction-chart';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})

export class IndexComponent implements OnInit {
  showloading: boolean = false;
  public doughnutChartType:string = 'doughnut';
 


  eligibilityChartData : number[] = [10,10,10] ;
    invoiceChartData : number[] = [10,10];
    paymentChartData : number[] = [10,10];

  eligibilityData : TransactionData;
  invoiceData : TransactionData;
  paymentData : TransactionData;

  //graph labels
  public eligibilityChartLabel : string[] = ['Total Transactions' , 'Pending by MCO', 'Pending by MMIS']
  public invoiceChartLabel : string[] =['Total Transactions','Pending by IEES'];
  public paymentChartLabel : string[] =['Total Transactions','Pending by IEES'];

  //  // events
  //  public chartClicked(e:any):void {
  //    console.log(e);
  //  }
  
  public chartHovered(e:any):void {
     console.log(e);
  }

  public AnimationBarOption;

  constructor(private _transactionservice : TransactionService) 
  { 
    
  }

  ngOnInit() {
    //initializing the values
    this.eligibilityData = {
      totalTransactions : 0,
      mcoPendingTransaction : 0,
      mmisPendingTransaction : 0,
      ieesPendingTransaction : 0
    }

    this.paymentData = {
      totalTransactions : 0,
      mcoPendingTransaction : 0,
      mmisPendingTransaction : 0,
      ieesPendingTransaction : 0
    }

    this.invoiceData = {
      totalTransactions : 0,
      mcoPendingTransaction : 0,
      mmisPendingTransaction : 0,
      ieesPendingTransaction : 0
    }

    //getting the eligbility transction counts
    this._transactionservice
    .getAllEligibility()
    .then(result=>{
      console.log("inside then");
      console.log(result);

      this.eligibilityData.totalTransactions = result.length;
      this.eligibilityData.mcoPendingTransaction = result.filter(function(el){
        return el.processedByMCO ==='N';
      }).length;
      this.eligibilityData.mmisPendingTransaction = result.filter(function(el){
        return el.processedByMMIS ==='N';
      }).length;

      this.eligibilityChartData = [
        this.eligibilityData.totalTransactions,
        this.eligibilityData.mcoPendingTransaction,
        this.eligibilityData.mmisPendingTransaction
      ]
      console.log("eligibility chart " +this.eligibilityChartData);
      })
    .catch(error => {
      console.log("inside catch");
      console.log(error);
    })

    //getting the payment transactions counts
    this._transactionservice
    .getAllPayments()
    .then(result=>{
      this.paymentData.totalTransactions = result.length;
      this.paymentData.ieesPendingTransaction = result.filter(function(el)
      {
        return el.processedByIEES === 'N'
      }).length;     
      this.paymentChartData = [
        this.paymentData.totalTransactions,
        this.paymentData.ieesPendingTransaction
      ]
      console.log("payment chart " +this.paymentChartData);
    })
    .catch(error => {
      console.log("inside catch");
      console.log(error);
    }); 
    
    //getting the invoice transactions counts
    this._transactionservice
    .getAllInvoices()
    .then(result=>{
      this.invoiceData.totalTransactions = result.length;
      this.invoiceData.ieesPendingTransaction = result.filter(function(el)
      {
        return el.processedByIEES === 'N'
      }).length;     
      this.invoiceChartData = [
        this.invoiceData.totalTransactions,
        this.invoiceData.ieesPendingTransaction
      ];
      console.log(this.invoiceChartData)
    })
    
    .catch(error => {
      console.log("inside catch");
      console.log(error);
    });   
  }
}
