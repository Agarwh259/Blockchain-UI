import { Component, Input } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import {ActivatedRoute,ActivatedRouteSnapshot,Router} from '@angular/router';

@Component({
  selector: 'pages-top',
  templateUrl: './pages-top.component.html',
  styleUrls: ['./pages-top.component.scss'],
})
export class PagesTopComponent {
  avatarImgSrc: string = 'assets/images/avatar.png';
  userName: string = sessionStorage.getItem('Role');
  userTitle: string = sessionStorage.getItem('Title');
  

  sidebarToggle: boolean = true;
  tip = { ring: true, email: true };

  constructor(private _globalService: GlobalService
    , private route: ActivatedRoute,
    private router: Router,) { }

  logout(){
    this.router.navigate(['/']);
  }

  public _sidebarToggle() {
    /* this._globalService.sidebarToggle$.subscribe(sidebarToggle => {
      this.sidebarToggle = sidebarToggle;
    }, error => {
      console.log('Error: ' + error);
    }); */

    this._globalService.data$.subscribe(data => {
      if (data.ev === 'sidebarToggle') {
        this.sidebarToggle = data.value;
      }
    }, error => {
      console.log('Error: ' + error);
    });
    this._globalService.dataBusChanged('sidebarToggle', !this.sidebarToggle);


    //this._globalService._sidebarToggleState(!this.sidebarToggle);
  }
}
