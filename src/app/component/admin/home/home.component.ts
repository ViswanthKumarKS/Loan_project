import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Documentapproval } from 'src/app/model/documentapproval';
import { Loan } from 'src/app/model/loan';
import { DocumentService } from 'src/app/service/document.service';
import { LoanService } from 'src/app/service/loan.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class AdminHomeComponent {
  options: AnimationOptions = {
    path: '/assets/admin.json',
  };
  loans: Loan[] = [];
  error: string | undefined;
  documents: Documentapproval[] = [];


  constructor(private loanService: LoanService,private documentService:DocumentService) {}

  
  ngOnInit(): void {
    this.loadLoanDetails();
    this.loadDocumentDetails();
  }

  private loadLoanDetails():void {
    this.loanService.getloanapproval().subscribe({
      next: (response: AppResponse) => {
        this.loans=response.data;
        console.log(this.loans);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

 private loadDocumentDetails(): void {
    this.documentService.getapproval().subscribe({
      next: (response: AppResponse) => {
        this.documents = response.data;
        console.log(this.documents);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}
