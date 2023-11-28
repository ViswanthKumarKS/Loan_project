import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/service/home.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  isLoggedIn: boolean = false;
  
  constructor(private homeService: HomeService,private authService:AuthService) {
 
  }
  

  



 

  logout(): void {
    this.authService.logout();
  }
}
