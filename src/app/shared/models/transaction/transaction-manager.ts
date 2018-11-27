import { Transaction } from './transaction';

export interface TransactionManager {

    submit(transaction: Transaction): Boolean;
    search(casenumber: Number): Transaction[];
    update(transaction: Transaction): Boolean;

}
