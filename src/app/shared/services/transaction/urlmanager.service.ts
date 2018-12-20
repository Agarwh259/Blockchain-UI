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
  baseUrl: string;

  constructor() {
    this.baseUrl  = 'http://104.211.226.176:4000/channels/medicaidchannel/chaincodes/medicaidcc';
    this.submitEligibility = this.baseUrl;
    this.submitPayment = this.baseUrl;

  }
}
