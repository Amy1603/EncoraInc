import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from '../modules/login/login.service';
// import { AuthService } from "./auth.service";
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  constructor(
    private loginService:LoginService,
    private router:Router){}
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean|Observable<boolean>|Promise<boolean>{
      const isAuth = Boolean(localStorage.getItem('authStatus'));
      const authToken = localStorage.getItem('authToken');
      if(!authToken){
          this.router.navigate(['/login']);
      }
      return isAuth;
  }
}
