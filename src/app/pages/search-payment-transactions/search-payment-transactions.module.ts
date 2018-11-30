import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './search-payment-transactions.routing';
import { SharedModule } from '../../shared/shared.module';
import { SearchPaymentTransactionsComponent } from './search-payment-transactions.component';
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
        SearchPaymentTransactionsComponent    ]
})
export class SearchPaymentTransactionsModule { }
