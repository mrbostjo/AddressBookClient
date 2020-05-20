import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ErrorManagerService } from './error-manager.service';
import { ContactManagerService } from './contact-manager.service';
import { ConfirmDialogService } from './confirm-dialog.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactEditorComponent } from './contact-editor/contact-editor.component';
import { ContactSearchComponent } from './contact-search/contact-search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactListComponent,
    ContactEditorComponent,
    ConfirmDialogComponent,
    ContactSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule
  ],
  exports: [
    ConfirmDialogComponent
],
  providers:  [
    { provide: ErrorHandler, useClass: ErrorManagerService },
    ConfirmDialogService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
