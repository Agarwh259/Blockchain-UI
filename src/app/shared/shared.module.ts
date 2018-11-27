import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { JsonpModule } from '@angular/http';

/* components */
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { SwitchComponent } from './components/switch/switch.component';
import { AlertComponent } from './components/alert/alert.component';
import {BasicTablesComponent} from '../pages/table/components/basic-tables/basic-tables.component';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
  ],
  declarations: [
    ProgressBarComponent,
    SwitchComponent,
    AlertComponent,
    BasicTablesComponent
  ],
  exports: [
    ProgressBarComponent,
    SwitchComponent,
    AlertComponent,
    BasicTablesComponent
  ]
})
export class SharedModule { }
