import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {
  unsubscribe$ = new Subject<void>();
  companiesData: any = [];
  constructor(private dashboardService:DashboardService,private router:Router,private commonService:CommonService) { }

  ngOnInit() {
    this.getCompaniesData();
  }
  /*
    *   function name: getCompaniesData()
    *   functionality: get companies data
    *   parameters : none
    */
  getCompaniesData(){
    this.commonService.display(true);
      this.dashboardService.getCompaniesData().pipe(takeUntil(this.unsubscribe$)).subscribe(response=>{
        if(response){
          this.commonService.display(false);
          this.companiesData = (<any>response);
      }
    },
    err => {
      this.commonService.display(false);
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
