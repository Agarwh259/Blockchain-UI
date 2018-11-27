import { Routes, RouterModule } from '@angular/router';
import { SearchEligibilityTransactionsComponent } from './search-eligibility-transactions.component';

const childRoutes: Routes = [
    {
        path: '',
        component: SearchEligibilityTransactionsComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
