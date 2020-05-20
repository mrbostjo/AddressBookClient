import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { ErrorManagerService } from './error-manager.service';
import { ContactManagerService } from './contact-manager.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactListComponent } from './contact-list/contact-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers:  [{ provide: ErrorHandler, useClass: ErrorManagerService }, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
