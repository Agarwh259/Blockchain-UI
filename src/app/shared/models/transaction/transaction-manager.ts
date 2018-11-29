import { Transaction } from './transaction';

export interface TransactionManager {

    submit(transaction: Transaction): any;
    searchEligibility(casenumber: Number, organization: String): any;
    searchPayment(casenumber: Number): any;
    updatePayment(casenumber: Number, organization: String, paymentDate?: Date): Boolean;
    updateEligibility(casenumber: Number, organization: String, paymentDate?: Date): Boolean;

}
