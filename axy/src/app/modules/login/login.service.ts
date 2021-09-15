import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/base-service.service';
import { RestServiceConstants } from 'src/app/common/rest-service-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService{
  private token: string;
  private authStatus: boolean = false;

  constructor(private http:HttpClient) {
    super();
   }
   /*
    *   function name: setAuthData()
    *   functionality: set authentication token
    *   parameters : token
    */
   setAuthData(token:string){
     this.token = token;
     this.authStatus = true;
    localStorage.setItem('authToken',token);
    localStorage.setItem('authStatus','true');
  }
  /*
    *   function name: clearAuthData()
    *   functionality: clear auth token
    *   parameters : none
    */
   clearAuthData(){
      localStorage.removeItem('authToken');
      localStorage.removeItem('authStatus');
  }
   /*
    *   function name: getAuthToken()
    *   functionality: get auth token
    *   parameters : none
    */
  getAuthToken(){
    return this.token;
  }
   /*
    *   function name: getAuthStatus()
    *   functionality: get auth status
    *   parameters : none
    */
  getAuthStatus(){
    return this.authStatus;
  }
  /*
    *   function name: getUserdata()
    *   functionality: return user data url
    *   parameters : none
    */
   getUserdata(){
    return this.http.get(`${this.getBaseUrl()}${RestServiceConstants.loginUrl}`,this.getConfig());
  }
 
}
