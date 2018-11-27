import { Routes, RouterModule } from '@angular/router';
import { SubmitEligibilityTransactionsComponent } from './submit-eligibility-transactions.component';

const childRoutes: Routes = [
    {
        path: '',
        component: SubmitEligibilityTransactionsComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
