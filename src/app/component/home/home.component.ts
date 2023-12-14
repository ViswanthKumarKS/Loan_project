import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/service/home.service';
import { AuthService } from 'src/app/service/auth.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  options: AnimationOptions = {
    path: '/assets/account.json',
  }
  options1: AnimationOptions = {
    path: '/assets/loan.json',
  }
  options2: AnimationOptions = {
    path: '/assets/win.json',
  };

  isLoggedIn: boolean = false;
  
  constructor(private homeService: HomeService,private authService:AuthService) {
 
  }
  

  



 

  logout(): void {
    this.authService.logout();
  }
}
