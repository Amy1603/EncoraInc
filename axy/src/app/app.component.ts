import { Component, OnInit } from '@angular/core';
import { CommonService } from './common/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'axy';
  public showLoader: boolean;

  constructor(private commonService:CommonService){}

  ngOnInit(){
    this.commonService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }
}
