import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/common/constants';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  labels: any;
  constructor(private router:Router,private loginService:LoginService) { }

  ngOnInit() {
    this.labels = Constants.headerConstants;
  }
  logout(){
    this.loginService.clearAuthData();
    this.router.navigate(['/login']);
  }
}
