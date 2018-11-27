import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './table.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

/* components */
import { TableComponent } from './table.component';

@NgModule({
    imports: [
        NgxPaginationModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing
    ],
    declarations: [
        TableComponent
    ]
})
export class TableModule { }
