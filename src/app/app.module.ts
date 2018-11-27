import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TokenmanagerService } from './shared/services/transaction/tokenmanager.service';
import { UrlmanagerService } from './shared/services/transaction/urlmanager.service';
import { LoggerService } from './shared/services/logging/logger.service';
import { TransactionService } from './shared/services/transaction/transaction.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PagesModule,
    ChartsModule,
    routing,
    NgbModule,
    FormsModule,
    NgxSpinnerModule,
    HttpModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent],
  providers: [TokenmanagerService, LoggerService, UrlmanagerService, TransactionService]
})
export class AppModule { }
