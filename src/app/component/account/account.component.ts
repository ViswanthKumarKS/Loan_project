import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account';
import { AppResponse } from 'src/app/model/appResponse';
import { AccountService } from 'src/app/service/account.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/service/storage.service';
import { AppUser } from 'src/app/model/appUser';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/noaccount.json',
  };
  approved: AnimationOptions = {
    path: '/assets/approved.json',
    renderer: 'svg',
    autoplay: true,
    loop: true,
  };

  accounts: Account[] = [];
  showAnimation = false;
  isAccountCreated: boolean = false;

  error: string = '';
  name: string = '';
  accountnumber: number = 0;
  address: string = '';
  city: string = '';
  state: string = '';
  balance: number = 0;
  username: string = '';

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private storageService: StorageService
  ) {}

  user: AppUser = this.storageService.getLoggedInUser();

  ngOnInit(): void {
    this.accountService.getaccountdetails(this.user.id).subscribe({
      next: (response: AppResponse) => {
        this.accounts.push(response.data);
        this.showAnimation = !this.accounts.length;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  onSubmit(form: any) {
    let userid: AppUser = this.storageService.getLoggedInUser();
    const newAccount: Account = {
      name: this.name,
      acc_no: this.accountnumber,
      address: this.address,
      city: this.city,
      state: this.state,
      balance: this.balance,
      username: this.username,
      user_id: userid.id,
    };

    console.log(newAccount);

    this.accountService.createaccount(newAccount).subscribe({
      next: (response: AppResponse) => {
        this.ngOnInit();

        this.showAnimation = false;
        this.isAccountCreated = false;
        this.toastr.success('Account Created successfully');
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}
