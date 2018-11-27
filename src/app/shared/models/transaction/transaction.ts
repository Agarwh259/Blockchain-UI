import { Guid } from 'guid-typescript';
import TransactionType from './transaction-type.enum';

export interface Transaction  {
transactionId: Guid;
transactionType: TransactionType;
caseNumber: String;
}

