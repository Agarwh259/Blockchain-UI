import { SearchTransaction } from "./search-transaction";

export interface PaymentSearchTransaction extends SearchTransaction {
    coverageMonth : Date;
    processedByIEES : string;
}