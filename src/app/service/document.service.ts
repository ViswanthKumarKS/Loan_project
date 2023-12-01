import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  getdownload(id: any, number: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  getdocumentdetails(id: number) {
    const appurl = `${urlEndpoint.baseUrl}/DocumentType/detail/${id}`;
    return this.http.get<AppResponse>(appurl);
  }

  getapproval(): Observable<AppResponse> {
    const appurl = `${urlEndpoint.baseUrl}/admin/document/all`;
    return this.http.get<AppResponse>(appurl);
  }

  approvedocument(id: number): Observable<AppResponse> {
    const appurl = `${urlEndpoint.baseUrl}/admin/document/approval/${id}`;
    return this.http.put<AppResponse>(appurl, null);
  }

  uploadDocument(document: FormData) {
    const appurl = `${urlEndpoint.baseUrl}/DocumentType`;
    return this.http.post<AppResponse>(appurl, document);
  }
}
