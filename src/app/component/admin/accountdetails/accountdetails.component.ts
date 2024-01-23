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

  accounts: any[] = [];
  error: string = '';
  searchQuery:string='';
  filteredaccounts:Account[]=[];
  sortOrder: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.accountService.getadminaccountdetails().subscribe({
      next: (response: AppResponse) => {
        this.accounts=response.data;
        this.filteredaccounts=response.data;
     
        
        

        
      
        console.log(response);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

 

  onSearch() {
    console.log('Search Query:', this.searchQuery);
  
    this.filteredaccounts = this.accounts.filter((account) =>
      account.name && account.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    

  }
  
  sortPostsAlphabetically() {
    console.log(this.sortOrder);
  
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  
    // Sort accounts and then apply search on the sorted array
    this.accountService.sort(this.sortOrder).subscribe(
      (response: AppResponse) => {
        this.accounts = response.data;
        this.filteredaccounts = this.sortAccounts(this.filteredaccounts);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  
  sortAccounts(accounts: Account[]): Account[] {
    return accounts.sort((a, b) => {
      if (this.sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);  
      }
    });
  }

  
}


  
 
 

