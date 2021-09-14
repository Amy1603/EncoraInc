import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/base-service.service';
import { RestServiceConstants } from 'src/app/common/rest-service-constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService{

  constructor(private http:HttpClient) {
    super();
   }

    /*
    *   function name: getCompaniesData()
    *   functionality: return companies data url
    *   parameters : none
    */
    getCompaniesData(){
      return this.http.get(`${this.getBaseUrl()}${RestServiceConstants.getCompaniesUrl}`,this.getConfig());
    }
}
