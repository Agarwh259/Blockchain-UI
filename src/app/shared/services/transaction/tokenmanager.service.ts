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
        this.tokenCode = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOjg2NDAwMDAwMDAwMDAwMDAwMCwidXNlcm5hbWUiOiJBYmVsSm9obnBhc3MxMjMiLCJvcmdOYW1lIjoiTWNvIiwiaWF0IjoxNTQ1MzA3ODQ3fQ.g5npFOrv-TehSmzxVYxPS-cd7zVKt_kf9VZlgSEwIj4'
        break;
      case 'MMIS':
        // tslint:disable-next-line:max-line-length
        this.tokenCode = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOjg2NDAwMDAwMDAwMDAwMDAwMCwidXNlcm5hbWUiOiJNYWNleVdpbGxpYW1zcGFzczEyMyIsIm9yZ05hbWUiOiJNbWlzIiwiaWF0IjoxNTQ1MzA3ODQ2fQ.NoUYxtPfVptTE1HhqP-fobwYsu769joeBxSSCzQaebo';
        break;
      default:
        // tslint:disable-next-line:max-line-length
        this.tokenCode = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOjg2NDAwMDAwMDAwMDAwMDAwMCwidXNlcm5hbWUiOiJBbmFHdXRtYW5ucGFzczEyMyIsIm9yZ05hbWUiOiJJZWVzIiwiaWF0IjoxNTQ1MzA3ODQ1fQ.D422DJXO2VeLYNFxAHoP9binSbP6OXt3SOP7LSHZ2Os';
        break;
    }

    return this.tokenCode;
  }
}
