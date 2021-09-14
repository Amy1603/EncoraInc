import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { LoginService } from 'src/app/modules/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class BaseInterceptorService implements HttpInterceptor{
  constructor(
    private loginService:LoginService
    ){}
  intercept(req:HttpRequest<any>,next:HttpHandler){
      let authstatus = this.loginService.getAuthStatus();
      if(authstatus){
          const authToken = this.loginService.getAuthToken();
          const authRequest = req.clone({
          headers: req.headers.set('X-Auth-Token',authToken)
          });
          return next.handle(authRequest);
      }else return next.handle(req);
  }
}
