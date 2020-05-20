import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ErrorManagerService } from './error-manager.service';
import { ContactManagerService } from './contact-manager.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactEditorComponent } from './contact-editor/contact-editor.component';
import { ContactSearchComponent } from './contact-search/contact-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactListComponent,
    ContactEditorComponent,
    ContactSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers:  [{ provide: ErrorHandler, useClass: ErrorManagerService }, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
