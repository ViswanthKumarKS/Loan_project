import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getaccountdetails(id: number): Observable<AppResponse> {
    const appurl = `${urlEndpoint.baseUrl}/account/detail/${id}`;
    return this.http.get<AppResponse>(appurl);
  }

  getadminaccountdetails(): Observable<AppResponse> {
    const appurl = `${urlEndpoint.baseUrl}/admin/account/all`;
    return this.http.get<AppResponse>(appurl);
  }
  createaccount(newaccount: Account): Observable<AppResponse> {
    const appurl = `${urlEndpoint.baseUrl}/account`;
    return this.http.post<AppResponse>(appurl, newaccount);
  }

  sort(sortOrder: string):Observable<AppResponse>{
    const appurl=`${urlEndpoint.baseUrl}/admin/account/sort/${sortOrder}`;
    return this.http.get<AppResponse>(appurl);
  }

}


