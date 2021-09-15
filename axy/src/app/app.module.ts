import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseInterceptorService } from './base/interceptor/base-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactsModule } from './modules/contacts/contacts.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { LoginModule } from './modules/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ContactsModule,
    DashboardModule,
    LoginModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:BaseInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
