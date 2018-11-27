import { Routes, RouterModule } from '@angular/router';
import { SearchInvoiceTransactionsComponent } from './search-invoice-transactions.component';

const childRoutes: Routes = [
    {
        path: '',
        component: SearchInvoiceTransactionsComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
