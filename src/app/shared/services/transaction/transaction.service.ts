import { Injectable } from '@angular/core';
import { TransactionManager } from '../../models/transaction/transaction-manager';
import { Transaction } from '../../models/transaction/transaction';
import { LoggerService } from '../logging/logger.service';
import Loglevel from '../../models/logging/loglevel.enum';
import { UrlmanagerService } from './urlmanager.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService implements TransactionManager {
  private readonly _logger: LoggerService;
  /**
   * Creates a new instance of the TransactionService
   * @param urlmanager contains all the endpoints of the blockchain API/Couchdb
   * @param logger provides an interface to log a message to the console
   */
  constructor(private urlmanager: UrlmanagerService,  logger: LoggerService) {
  this._logger = logger;
    this._logger.Log('Instantiating TransactionService', Loglevel.Info);
  }

  private transactions: Transaction[];

  /**
   * Calls the blockchain API to add the transaction
   * @param transaction that the user wants to submit on to the blockchain
   */
  submit(transaction: Transaction): Boolean {
    this._logger.Log(
      'Submitting the Transaction : ' + transaction);
    // call the blockchain API to submit the transaction
    return true;
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
