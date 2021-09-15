import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public isLoader: boolean;
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
  
  display(value: boolean) {
    this.isLoader = value;
    this.status.next(value);
}
}
