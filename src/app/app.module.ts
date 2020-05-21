import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorManagerService } from './error-manager.service';
import { ContactManagerService } from './contact-manager.service';
import { ModalDialogService } from './modal-dialog.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactEditorComponent } from './contact-editor/contact-editor.component';
import { ContactSearchComponent } from './contact-search/contact-search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactListComponent,
    ContactEditorComponent,
    ConfirmDialogComponent,
    ContactSearchComponent,
    AlertDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
  ],
  exports: [
    ConfirmDialogComponent
],
  providers:  [
    { provide: ErrorHandler, useClass: ErrorManagerService },
    ModalDialogService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
