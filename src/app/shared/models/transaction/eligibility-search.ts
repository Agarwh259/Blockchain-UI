import { SearchTransaction } from "./search-transaction";

export interface EligibilitySearchTransaction extends SearchTransaction {
    maidCardNumber : string;
    processedByMMIS : string;
    processedByMCO : string;
}