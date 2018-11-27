import { Injectable } from '@angular/core';
import { Organization } from '../../models/user/organization';

@Injectable({
  providedIn: 'root'
})
export class TokenmanagerService {
  private tokenCode: String;
  constructor() {}

  getToken(organization: Organization): String {
    switch (organization.orgCode) {
      case 'MCO':
        // tslint:disable-next-line:max-line-length
        this.tokenCode = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDMyNjk2NjAsInVzZXJuYW1lIjoiQWJlbEpvaG5wYXNzMTIzIiwib3JnTmFtZSI6Ik1jbyIsImlhdCI6MTU0MzIzMzY2MH0.ALxSQIHX2ndpwY1dlEpZL9hy7_Bl3zTiHSPReXNaQMw';
        break;
      case 'MMIS':
        // tslint:disable-next-line:max-line-length
        this.tokenCode = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDMyNjk2NTksInVzZXJuYW1lIjoiTWFjZXlXaWxsaWFtc3Bhc3MxMjMiLCJvcmdOYW1lIjoiTW1pcyIsImlhdCI6MTU0MzIzMzY1OX0.EQu2KIW76uhCubvixu62_oJYiBdv-A61vtWaEoelsLE';
        break;
      default:
        // tslint:disable-next-line:max-line-length
        this.tokenCode = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDMyNjk2NTgsInVzZXJuYW1lIjoiQW5hR3V0bWFubnBhc3MxMjMiLCJvcmdOYW1lIjoiSWVlcyIsImlhdCI6MTU0MzIzMzY1OH0.WboyyLZUYe-7mIlxh89WPBUwHaHa3FBoNri28Er4oiw';
        break;
    }

    return this.tokenCode;
  }
}
