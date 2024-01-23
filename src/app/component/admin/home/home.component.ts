import { Component,AfterViewInit} from '@angular/core';
import { Chart } from 'chart.js';
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
export class AdminHomeComponent implements AfterViewInit {
  options: AnimationOptions = {
    path: '/assets/admin.json',
  };
  loans: Loan[] = [];
  error: string | undefined;
  documents: Documentapproval[] = [];
  myChart: any;


  constructor(private loanService: LoanService,private documentService:DocumentService) {}

  
  ngAfterViewInit(): void {
    this.loadLoanDetails();
    this.loadDocumentDetails();
    // this.createPieChart();
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

  // createChart() {
  //   let xValues = ['Premium', 'Gold', 'Silver'];
  //   let yValues = [
  //     this.loans[0]?.id || 0,
  //     this.loans[1]?.amount || 0,
  //     this.loans[2]?.amount || 0,
  //   ];
  //   let barColors = ['purple', 'gold', 'silver'];

  //   if (this.myChart) {
  //     this.myChart.destroy(); // Destroy existing chart if it exists
  //   }

  //   let myChart= new Chart('myChart', {
  //     type: 'pie',
  //     data: {
  //       labels: xValues,
  //       datasets: [
  //         {
  //           backgroundColor: barColors,
  //           data: yValues,
  //         },
  //       ],
  //     },
  //     options: {
  //       plugins: {
  //         title: {
  //           display: true,
  //           text: 'Category based room booking',
  //           font: {
  //             size: 20,
  //           },
  //         },
  //       },
  //       layout: {
  //         padding: {
  //           top: 50,
  //           bottom: 50,
  //         },
  //       },
  //     },
  //   });
  // }

  // private createPieChart(): void {
  //   const loanApprovalCounts = this.getCounts(this.loans, 'loanType');
  //   const documentApprovalCounts = this.getCounts(this.documents, 'documentName');

  //   const labels = Object.keys(loanApprovalCounts);
  //   const loanData = Object.values(loanApprovalCounts);
  //   const documentData = Object.values(documentApprovalCounts);

  //   // Combine data for the pie chart
  //   const data = [...loanData, ...documentData];

  //   if (this.myChart) {
  //     this.myChart.destroy();
  //   }

  //   this.myChart = new Chart('pieChart', {
  //     type: 'pie',
  //     data: {
  //       labels,
  //       datasets: [
  //         {
  //           data,
  //           backgroundColor: [
  //             'rgba(255, 99, 132, 0.8)',
  //             'rgba(54, 162, 235, 0.8)',
  //             'rgba(255, 206, 86, 0.8)',
  //             'rgba(75, 192, 192, 0.8)',
  //           ],
  //         },
  //       ],
  //     },
  //   });
  // }

  // private getCounts(data: any[], key: string): { [key: string]: number } {
  //   return data.reduce((counts, item) => {
  //     const value = item[key];
  //     counts[value] = (counts[value] || 0) + 1;
  //     return counts;
  //   }, {});
  // }

}
  

