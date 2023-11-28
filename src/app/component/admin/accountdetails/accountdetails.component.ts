import { Component } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { AppResponse } from 'src/app/model/appResponse';
import { Account } from 'src/app/model/account';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-accountdetails',
  templateUrl: './accountdetails.component.html',
  styleUrls: ['./accountdetails.component.css']
})
export class AccountdetailsComponent {
  
 

  constructor(private accountService: AccountService){}

  accounts: Account[] = [];
  error: String = '';

  ngOnInit(): void {
    this.accountService.getadminaccountdetails().subscribe({
      next: (response: AppResponse) => {
        this.accounts=response.data;
        console.log(response);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

}
