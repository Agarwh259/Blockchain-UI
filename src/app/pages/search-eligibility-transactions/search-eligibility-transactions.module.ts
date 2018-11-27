import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './search-eligibility-transactions.routing';
import { SharedModule } from '../../shared/shared.module';
import { SearchEligibilityTransactionsComponent } from './search-eligibility-transactions.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing,
        NgxSpinnerModule
    ],
    declarations: [
        SearchEligibilityTransactionsComponent    ]
})
export class SearchEligibilityTransactionsModule { }
