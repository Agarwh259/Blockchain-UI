import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../shared/services/authGuard';

export const childRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'pages',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'index', pathMatch: 'full' },
            { path: 'index', loadChildren: './index/index.module#IndexModule',canActivate:[AuthGuard]  },
            { path: 'submit-eligibility-transactions', loadChildren: './submit-eligibility-transactions/submit-eligibility-transactions.module#SubmitEligibilityTransactionsModule',
            canActivate:[AuthGuard] },
            { path: 'search-eligibility-transactions', loadChildren: './search-eligibility-transactions/search-eligibility-transactions.module#SearchEligibilityTransactionsModule'},
            { path: 'search-payment-transactions', loadChildren: './search-payment-transactions/search-payment-transactions.module#SearchPaymentTransactionsModule' },
            { path: 'search-invoice-transactions', loadChildren: './search-invoice-transactions/search-invoice-transactions.module#SearchInvoiceTransactionsModule' },
            { path: 'submit-invoice-transactions', loadChildren: './submit-invoice-transactions/submit-invoice-transactions.module#SubmitInvoiceTransactionsModule' },
            { path: 'submit-payment-transactions', loadChildren: './submit-payment-transactions/submit-payment-transactions.module#SubmitPaymentTransactionsModule' },
        
        ]

    }
];

export const routing = RouterModule.forChild(childRoutes);
