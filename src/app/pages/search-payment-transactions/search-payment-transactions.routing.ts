import { Routes, RouterModule } from '@angular/router';
import { SearchPaymentTransactionsComponent } from './search-payment-transactions.component';

const childRoutes: Routes = [
    {
        path: '',
        component: SearchPaymentTransactionsComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
