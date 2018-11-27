import { Routes, RouterModule } from '@angular/router';
import { SubmitPaymentTransactionsComponent } from './submit-payment-transactions.component';

const childRoutes: Routes = [
    {
        path: '',
        component: SubmitPaymentTransactionsComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
