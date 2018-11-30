import { Transaction } from './transaction';

export interface TransactionManager {

    submit(transaction: Transaction): any;
    searchEligibility(casenumber: Number, organization: String): Promise<any>;
    searchPayment(casenumber: Number, organization: String): Promise<any>;
    updatePayment(casenumber: Number, organization: String, paymentDate?: Date): Boolean;
    updateEligibility(casenumber: Number, organization: String, paymentDate?: Date): Boolean;
    getPayments(): Promise<any>;
    getEligibility(organization: String): Promise<any>;

}
