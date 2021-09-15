import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { Constants } from 'src/app/common/constants';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {
  unsubscribe$ = new Subject<void>();
  companiesData: any = [];
  labels: any;
  constructor(private dashboardService:DashboardService,private router:Router,private commonService:CommonService) { }

  ngOnInit() {
    this.labels = Constants.dashboardConstants;
    this.getCompaniesData();
  }
  /*
    *   function name: getCompaniesData()
    *   functionality: get companies data
    *   parameters : none
    */
  getCompaniesData(){
      this.dashboardService.getCompaniesData().pipe(takeUntil(this.unsubscribe$)).subscribe(response=>{
        if(response){
          this.companiesData = (<any>response);
      }
    },
    err => {
      console.log('Error in fetching Companies Data');
    }
    );
  }
  /*
    *   function name: navigateTo()
    *   functionality: navigateTo company's contacts details page
    *   parameters : none
    */
  navigateTo(){
    this.router.navigate(['/contacts']);
  }
  ngOnDestroy(){
    if(this.unsubscribe$){
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
  }
}
