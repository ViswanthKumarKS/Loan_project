import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Loan } from '../model/loan';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private http: HttpClient) {}

  getloandetails(id:number): Observable<AppResponse> {
    const appurl = `${urlEndpoint.baseUrl}/loan/detail/${id}`;
    return this.http.get<AppResponse>(appurl);
  }

  getloanapproval(): Observable<AppResponse> {
    const appurl = `${urlEndpoint.baseUrl}/admin/all`;
    return this.http.get<AppResponse>(appurl);
  }

  createloan(newLoan: Loan) {
    const appurl = `${urlEndpoint.baseUrl}/loan`;
    return this.http.post<AppResponse>(appurl, newLoan);
  }

  approveLoan(id: number): Observable<AppResponse> {
    const appurl = `${urlEndpoint.baseUrl}/admin/approval/${id}`;
    return this.http.put<AppResponse>(appurl,null);
  }

  filterLoans(minAmount:number,maxAmount:number): Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/filter/${minAmount}/${maxAmount}`);
  }
}
