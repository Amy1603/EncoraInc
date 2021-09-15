import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationError, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent } from '@angular/router';
import { CommonService } from './common/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'axy';
  public showLoader: boolean = false;

  constructor(private commonService:CommonService,private router:Router){
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit(){
    this.commonService.loadingRequest.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }
  // Function to display loader when lazily loaded module chunk loads
  navigationInterceptor(event: RouterEvent): void {
    let activeRequests = parseInt(sessionStorage.getItem('activeRequests'));
      if (event instanceof ResolveStart || event instanceof RouteConfigLoadStart) {
        this.commonService.setLoading(true);
    }
    if (event instanceof NavigationCancel || event instanceof NavigationError || event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
      this.commonService.setLoading(false);
        if(activeRequests && activeRequests != 0){
          this.commonService.setLoading(true);
        }
    }
  }
}
