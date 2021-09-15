import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/base-service.service';
import { RestServiceConstants } from 'src/app/common/rest-service-constants';

@Injectable()
export class ContactsService extends BaseService{

  constructor(private http:HttpClient) {
    super();
   }

    /*
    *   function name: getContactsData()
    *   functionality: return contacts data url
    *   parameters : none
    */
    getContactsData(){
      return this.http.get(`${this.getBaseUrl()}${RestServiceConstants.getContactsDataUrl}`,this.getConfig());
    }
}
