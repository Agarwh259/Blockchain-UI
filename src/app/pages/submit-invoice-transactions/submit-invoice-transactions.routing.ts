import { Routes, RouterModule } from '@angular/router';
import { SubmitInvoiceTransactionsComponent } from './submit-invoice-transactions.component';

const childRoutes: Routes = [
    {
        path: '',
        component: SubmitInvoiceTransactionsComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
