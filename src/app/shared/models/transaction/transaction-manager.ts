import { Transaction } from './transaction';

export interface TransactionManager {

    submit(transaction: Transaction): any;
    search(casenumber: Number): Transaction[];
    update(transaction: Transaction): Boolean;

}
