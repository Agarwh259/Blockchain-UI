import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './search-invoice-transactions.routing';
import { SharedModule } from '../../shared/shared.module';
import { SearchInvoiceTransactionsComponent } from './search-invoice-transactions.component';
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
        SearchInvoiceTransactionsComponent    ]
})
export class SearchInvoiceTransactionsModule { }
