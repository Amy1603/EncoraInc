import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BaseInterceptorService implements HttpInterceptor{
  constructor(
    // private authService:AuthService
    ){}
  intercept(req:HttpRequest<any>,next:HttpHandler){
      let authstatus = localStorage.getItem('authStatus');
      if(authstatus == 'true'){
          // const authToken = this.authService.getAuthToken();
          const authRequest = req.clone({
          // headers: req.headers.set('X-Auth-Token',authToken)
          });
          return next.handle(authRequest);
      }else return next.handle(req);
  }
}
