import { Transaction } from './transaction';

export interface TransactionManager {

    submit(transaction: Transaction): any;
    search(casenumber: Number): Transaction[];
    updatePayment(casenumber: Number, organization: String, paymentDate?: Date): Boolean;
    updateEligibility(casenumber: Number, organization: String, paymentDate?: Date): Boolean;

}
