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
        this.tokenCode = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDMyNjk2NjAsInVzZXJuYW1lIjoiQWJlbEpvaG5wYXNzMTIzIiwib3JnTmFtZSI6Ik1jbyIsImlhdCI6MTU0MzIzMzY2MH0.ALxSQIHX2ndpwY1dlEpZL9hy7_Bl3zTiHSPReXNaQMw';
        break;
      case 'MMIS':
        // tslint:disable-next-line:max-line-length
        this.tokenCode = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDMyNjk2NTksInVzZXJuYW1lIjoiTWFjZXlXaWxsaWFtc3Bhc3MxMjMiLCJvcmdOYW1lIjoiTW1pcyIsImlhdCI6MTU0MzIzMzY1OX0.EQu2KIW76uhCubvixu62_oJYiBdv-A61vtWaEoelsLE';
        break;
      default:
        // tslint:disable-next-line:max-line-length
        this.tokenCode = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDMzNzA2NzksInVzZXJuYW1lIjoiQW5hR3V0bWFubnBhc3MxMjMiLCJvcmdOYW1lIjoiSWVlcyIsImlhdCI6MTU0MzMzNDY3OX0.L7pbodQckp3fceq1nvemUQhu6G8FPJfLX7YGpf5lmYQ';
        break;
    }

    return this.tokenCode;
  }
}
