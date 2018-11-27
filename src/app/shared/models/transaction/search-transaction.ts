import { IssuerType } from "./issuer-type.enum";

export interface SearchTransaction  {
     caseNumber: String;
     issuerId: IssuerType;
     createDate : Date;
    }