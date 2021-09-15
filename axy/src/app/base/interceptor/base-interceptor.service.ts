import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { LoginService } from 'src/app/modules/login/login.service';
import { CommonService } from 'src/app/common/services/common.service';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseInterceptorService implements HttpInterceptor{
  activeRequests = 0;
  showLoader: boolean;
  constructor(
    private loginService:LoginService,
    private commonService:CommonService
    ){}
  intercept(req:HttpRequest<any>,next:HttpHandler){
    this.commonService.loadingRequest.subscribe((val: boolean) => {
      this.showLoader = val;
    });
    if (this.activeRequests === 0 || (this.activeRequests != 0 && !this.showLoader)) {
      this.commonService.setLoading(true);
    }
    this.activeRequests++;
      let authstatus = this.loginService.getAuthStatus();
      if(authstatus){
          // adding auth token to every request if user has logged in successfully
          const authToken = this.loginService.getAuthToken();
          const authRequest = req.clone({
          headers: req.headers.set('X-Auth-Token',authToken)
          });
          return <any>next.handle(authRequest).pipe(
          tap(res => {
            if (res instanceof HttpResponse) {
                this.activeRequests--;
                sessionStorage.setItem('activeRequests',String(this.activeRequests));
              if (this.activeRequests <= 0) {
                this.commonService.setLoading(false);
              }
            }
          }),
          catchError(err => {
            this.commonService.setLoading(false);
            sessionStorage.setItem('activeRequests',String(this.activeRequests));
            this.activeRequests = 0;
            throw err;
          }))
      }else return <any>next.handle(req)
      .pipe(finalize(() => {
          this.activeRequests--;
          sessionStorage.setItem('activeRequests',String(this.activeRequests));
          if (this.activeRequests === 0) {
            this.commonService.setLoading(false);
        }
      }))
      ;
  }
}
