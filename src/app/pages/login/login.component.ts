import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,ActivatedRouteSnapshot,Router} from '@angular/router';
import { FormControl,FormGroupDirective,Validators,NgForm} from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      ) { }

  ngOnInit() {
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
  }

  login(f) {
    console.log(f);
    this.loading = true;
      this.authenticationService.login(f.username, f.password);
      debugger;
      if(!!sessionStorage.getItem('Role')){
      this.router.navigate(['/pages/index']);
      }
  }
}
