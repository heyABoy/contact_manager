import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list/contact-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterPipeModule } from 'ngx-filter-pipe';
import { AddNewContactComponent } from './contact-list/add-new-contact/add-new-contact.component';
import { UpdateContactComponent } from './contact-list/update-contact/update-contact.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    AddNewContactComponent,
    UpdateContactComponent,
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    FilterPipeModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
