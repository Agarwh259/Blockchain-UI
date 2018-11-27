import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './submit-eligibility-transactions.routing';
import { SharedModule } from '../../shared/shared.module';
import { SubmitEligibilityTransactionsComponent } from './submit-eligibility-transactions.component'


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing
    ],
    declarations: [
        SubmitEligibilityTransactionsComponent    ]
})
export class SubmitEligibilityTransactionsModule { }
