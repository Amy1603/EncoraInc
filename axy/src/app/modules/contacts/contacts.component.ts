import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ContactsService } from './contacts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit,OnDestroy {
  unsubscribe$ = new Subject<void>();
  contactsData: any;
  contactForm:FormGroup
  editedIndex: number;
  saveFlag: string = "add";
  constructor(private contactsService:ContactsService,private fb:FormBuilder,private commonService:CommonService) { }

  ngOnInit(): void {
    this.getContactsData();
    this.createForm();
  }
  /*
    *   function name: getContactsData()
    *   functionality: get contacts data
    *   parameters : none
    */
  getContactsData(){
    this.commonService.display(true);
    this.contactsService.getContactsData().pipe(takeUntil(this.unsubscribe$)).subscribe(response=>{
      if(response){
        this.commonService.display(false);
        this.contactsData = (<any>response);
    }
  },
  err => {
    this.commonService.display(false);
    console.log('Error in fetching Companies Data');
  }
  );
}
/*
    *   function name: delete()
    *   functionality: delete contact data
    *   parameters : none
    */
delete(i:number){
  this.contactsData.splice(i,1);
}
/*
    *   function name: createForm()
    *   functionality: create contact form
    *   parameters : none
    */
createForm(){
  this.contactForm = this.fb.group({
    name:'',
    country:'',
    phone:'',
  });
}
/*
    *   function name: editForm()
    *   functionality: edit contact form
    *   parameters : contact data
    */
editForm(contact:any,i:number){
  this.contactForm.setValue({
    name:contact.name,
    country:contact.country,
    phone:contact.phone,
  });
  this.editedIndex = i;
  this.saveFlag = "edit";
}
/*
    *   function name: save()
    *   functionality: save contact form
    *   parameters : none
    */
save(){
  if(this.saveFlag === "edit"){
    let editedContactData=this.contactForm.value;
    this.contactsData.splice(this.editedIndex,1,editedContactData);
    this.contactForm.reset();
  }else{
    let contactData = this.contactForm.value;
    // contactData.id = this.contactsData.lenth;
    this.contactsData.push(contactData);
  }
  
  
}
/*
    *   function name: addForm()
    *   functionality: add contact form
    *   parameters : none
    */
addForm(){
  this.saveFlag = "add";
}
  ngOnDestroy(){
    if(this.unsubscribe$){
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
  }
}
