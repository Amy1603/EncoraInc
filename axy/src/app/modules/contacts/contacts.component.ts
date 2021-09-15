import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ContactsService } from './contacts.service';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common/services/common.service';
import { Constants } from 'src/app/common/constants';

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
  labels: any;
  showErrors: boolean = false;
  constructor(private contactsService:ContactsService,private fb:FormBuilder,private commonService:CommonService) { }

  ngOnInit(): void {
    this.labels = Constants.contactsConstants;
    this.getContactsData();
    this.createForm();
  }
  /*
    *   function name: getContactsData()
    *   functionality: get contacts data
    *   parameters : none
    */
  getContactsData(){
    this.contactsService.getContactsData().pipe(takeUntil(this.unsubscribe$)).subscribe(response=>{
      if(response){
        this.contactsData = (<any>response);
    }
  },
  err => {
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
    // if(this.contactForm.valid){
      let contactData = this.contactForm.value;
      if(contactData.name && contactData.country&& contactData.phone) this.contactsData.push(contactData);
      else this.showErrors = true;
      setTimeout(()=>{
        this.showErrors = false;
      },5000);
    // }else{
    //   this.showErrors = true;
    // }
  }
}
/*
    *   function name: addForm()
    *   functionality: add contact form
    *   parameters : none
    */
addForm(){
  this.saveFlag = "add";
  // this.contactForm.controls.name.setValidators(Validators.required);
  // this.contactForm.controls.country.setValidators(Validators.required);
  // this.contactForm.controls.phone.setValidators(Validators.required);
  // this.contactForm.controls.name.updateValueAndValidity();
  // this.contactForm.controls.country.updateValueAndValidity();
  // this.contactForm.controls.phone.updateValueAndValidity();
}

ngOnDestroy(){
    if(this.unsubscribe$){
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
  }
}
