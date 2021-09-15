import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  unsubscribe$ = new Subject<void>();
  loginForm:FormGroup;
  invalidUser: boolean = false;
  labels: any;
  constructor(private loginService:LoginService,private fb:FormBuilder,private router:Router,private commonService:CommonService) { }

  ngOnInit() {
    this.createForm();
    this.labels = Constants.loginConstants;
  }
  /*
    *   function name: createForm()
    *   functionality: to create login form
    *   parameters : none
    */
  createForm(){
    this.loginForm = this.fb.group({
      email:['',(Validators.required,Validators.email)],
      password:['',Validators.required]
    });
  }
  /*
    *   function name: login()
    *   functionality: login the user
    *   parameters : none
    */
  login(){
    if(this.loginForm.valid){
      let email = this.loginForm.value.email;
      this.loginService.getUserdata().pipe(takeUntil(this.unsubscribe$)).subscribe(response=>{
        if(response){
          let data = (<any>response);
          // since we have dummy data verifying user using email id and setting random token from frontend itself.
          data.forEach(user=>{
            if(user.email == email.toLowerCase()) {
              const token  = Math.random().toString();
              this.loginService.setAuthData(token);
            }
          });
          if(this.loginService.getAuthStatus()){
            this.router.navigate(['/dashboard']);
          }else{
            this.invalidUser = true;
          }
        }
      },
      err => {
        console.log('Error in fetching User Data');
      });
    }
    
  }

  ngOnDestroy(){
    if(this.unsubscribe$){
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
  }

}
