import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { ContactsService } from './contacts.service';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ContactsComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    ContactsComponent
  ],
  providers:[ContactsService]
})
export class ContactsModule { }
