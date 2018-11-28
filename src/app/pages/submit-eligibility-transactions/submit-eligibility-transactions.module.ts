import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './submit-eligibility-transactions.routing';
import { SharedModule } from '../../shared/shared.module';
import { SubmitEligibilityTransactionsComponent } from './submit-eligibility-transactions.component'
import { NgxSpinnerModule } from 'ngx-spinner';
import { SimpleNotificationsModule } from 'angular2-notifications';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing,
        NgxSpinnerModule,
        SimpleNotificationsModule.forRoot()
    ],
    declarations: [
        SubmitEligibilityTransactionsComponent    ]
})
export class SubmitEligibilityTransactionsModule { }
