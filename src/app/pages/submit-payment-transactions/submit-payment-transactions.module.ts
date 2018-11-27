import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './submit-payment-transactions.routing';
import { SharedModule } from '../../shared/shared.module';
import { SubmitPaymentTransactionsComponent } from './submit-payment-transactions.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing
    ],
    declarations: [
        SubmitPaymentTransactionsComponent    ]
})
export class SubmitPaymentTransactionsModule { }
