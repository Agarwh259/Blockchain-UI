import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {
    constructor() { 


    }

    userData:any=[
        {
            userName:'abc123@mmis.com',
            password:'abc123',
            role:'MMIS',
            title:'Medicaid Management Information System (MMIS)'
        },
        {
            userName:'abc1234@iees.com',
            password:'abc1234',
            role:'IEES',
            title:'Integrated Eligibility & Enrollment System (IEES)'
        },
        {
            userName:'abc1234@mco.com',
            password:'abc1234',
            role:'MCO',
            title:'Managed Care Organization systems (MCO)'
        }
    ];

    login(username: string, password: string) {
                   console.log(this.userData);
                   let userDataList= this.userData.filter(x=> x.userName == username)[0]
                   if(!!userDataList)
                   {
                       let role = userDataList.role;
                       let title = userDataList.title;
                        console.log(role);
                   if(!!role){
                       debugger;
                   // store user details and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem('currentUser', JSON.stringify(username));
                    sessionStorage.setItem('isLoggedIn','Y');
                    sessionStorage.setItem('Role',role);
                    sessionStorage.setItem('Title',title);
                   }
                   }
                   else{
                       alert("Login Failed");
                       sessionStorage.removeItem('currentUser');
                       sessionStorage.removeItem('isLoggedIn');
                       sessionStorage.removeItem('Role');
                       sessionStorage.removeItem('Title');
                   }
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('Role');
        sessionStorage.removeItem('Title');
    }
}