import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loadingRequest = new BehaviorSubject(false);
  showHeader = new BehaviorSubject(true);
  private timeout: any;

  setLoading(val: boolean): void {
    if (!val) {
      this.timeout = setTimeout(() => {
        this.loadingRequest.next(val);
      }, 300);
    } else {
      clearTimeout(this.timeout);
      this.loadingRequest.next(val);
    }
  }

  headerStatus(val:boolean){
    this.showHeader.next(val);
  }
}
