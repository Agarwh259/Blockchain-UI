import { Injectable } from '@angular/core';
import { UrlManager } from '../../models/transaction/urlmanager';

@Injectable({
  providedIn: 'root'
})
export class UrlmanagerService implements UrlManager {
  submitEligibility: String;
  submitPayment: String;
  searchTransactions: String;
  updateTransaction: String;

  constructor() {
  this.submitEligibility = 'http://104.211.213.148:4000/channels/medicaidchannel/chaincodes/medicaidcc'; 

  }
}
