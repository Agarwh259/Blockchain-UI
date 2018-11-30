import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './submit-payment-transactions.routing';
import { SharedModule } from '../../shared/shared.module';
import { SubmitPaymentTransactionsComponent } from './submit-payment-transactions.component';
import { SimpleNotificationsModule } from 'angular2-notifications';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing,
        SimpleNotificationsModule.forRoot()
    ],
    declarations: [
        SubmitPaymentTransactionsComponent    ]
})
export class SubmitPaymentTransactionsModule { }
