import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit,OnDestroy {

  constructor(private commonService:CommonService) { }

  ngOnInit(): void {
    this.commonService.headerStatus(false);
  }
  ngOnDestroy(){
    this.commonService.headerStatus(true);
  }
}
