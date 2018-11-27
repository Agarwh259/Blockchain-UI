import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';

import { LayoutModule } from '../shared/layout.module';
import { SharedModule } from '../shared/shared.module';

/* components */
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';
import { AuthGuard } from '../shared/services/authGuard';

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        SharedModule,
        FormsModule,
        routing
    ],
    declarations: [
        PagesComponent,
        LoginComponent
    ],
    providers:[AuthenticationService,AuthGuard]
})
export class PagesModule { }
