import { Component, OnInit } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Loan } from 'src/app/model/loan';
import { StorageService } from 'src/app/service/storage.service';
import { LoanService } from 'src/app/service/loan.service';
import { AnimationOptions } from 'ngx-lottie';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
})
export class LoanComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/loan.json',
  };
  status: string = "Approved"
  loans: Loan[] = [];
  error: String = '';
  loanType:String='';
  amount:number=0;

  username:String='';
 




  constructor(private loanService: LoanService, private storageService: StorageService) {}

  user: AppUser = this.storageService.getLoggedInUser();

  ngOnInit(): void {
    this.loanService.getloandetails(this.user.id).subscribe({
      next: (response: AppResponse) => {
       console.log(response.data.loanRequest);
       
        
        this.loans.push(response.data);

        console.log(response.data);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  

  onSubmit(form:any){
    let userid:AppUser = this.storageService.getLoggedInUser();

    const newLoan:Loan={
      amount: this.amount,
      loanType: this.loanType,
      username: this.username,
      user_id: userid.id,
      id: 0,
      approved: false
    }

    this.loanService.createloan(newLoan).subscribe({
      next: (response: AppResponse) => {
        this.ngOnInit();
       
       
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}
