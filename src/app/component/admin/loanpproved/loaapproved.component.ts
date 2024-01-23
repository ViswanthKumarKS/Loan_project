import { Component, OnInit } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { Loan } from 'src/app/model/loan';
import { LoanService } from 'src/app/service/loan.service';

@Component({
  selector: 'app-loaapproved',
  templateUrl: './loaapproved.component.html',
  styleUrls: ['./loaapproved.component.css'],
})
export class LoaapprovedComponent implements OnInit {
  loans: Loan[] = [];
  error: string = '';
  router: any;
  minAmount: number=0;
  maxAmount: number=50000;
  filteredLoans: Loan[]=[];

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
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

  approveLoan(id: number) {
    this.loanService.approveLoan(id).subscribe({
      next: (response: AppResponse) => {
        this.ngOnInit();
       
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  viewPDF(pdfUrl: string) {
    // Assuming you have a PdfViewerComponent for viewing PDFs
    this.router.navigate(['/documentapproval', pdfUrl]);
  }

  
  onSubmit() {
    console.log(this.minAmount);
    
    console.log(this.maxAmount);
    this.loanService.filterLoans(this.minAmount, this.maxAmount).subscribe({
      next:(response:any)=>{
        console.log(response)
        this.filteredLoans = response;
       
      }
    })
    console.log(this.filteredLoans);
  this.loans=this.filteredLoans;
  }
}
     

  
