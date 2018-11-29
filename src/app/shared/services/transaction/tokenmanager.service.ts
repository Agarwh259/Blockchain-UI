import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenmanagerService {
  private tokenCode: String;
  constructor() {}

  getToken(organization: String): String {
    switch (organization) {
      case 'MCO':
        // tslint:disable-next-line:max-line-length
        this.tokenCode = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOjg2NDAwMDAwMDAwMDAwMDAwMCwidXNlcm5hbWUiOiJBYmVsSm9obnBhc3MxMjMiLCJvcmdOYW1lIjoiTWNvIiwiaWF0IjoxNTQzNDI5NTcxfQ.aSks6kk_xxIriRUKNvDXr84198XzIKRd-nfUd_WWj3k';
        break;
      case 'MMIS':
        // tslint:disable-next-line:max-line-length
        this.tokenCode = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOjg2NDAwMDAwMDAwMDAwMDAwMCwidXNlcm5hbWUiOiJNYWNleVdpbGxpYW1zcGFzczEyMyIsIm9yZ05hbWUiOiJNbWlzIiwiaWF0IjoxNTQzNDI5NTcwfQ.vfpW0fBLxm6DjHmvbOFz54hdj3Uz_ZmoY0RXPFPr41o';
        break;
      default:
        // tslint:disable-next-line:max-line-length
        this.tokenCode = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOjg2NDAwMDAwMDAwMDAwMDAwMCwidXNlcm5hbWUiOiJBbmFHdXRtYW5ucGFzczEyMyIsIm9yZ05hbWUiOiJJZWVzIiwiaWF0IjoxNTQzNDI5NTY4fQ.TBxSigCE2RukzVZCp7-Eyk-4PVX_oLDrduyqnCNCiVU';
        break;
    }

    return this.tokenCode;
  }
}
