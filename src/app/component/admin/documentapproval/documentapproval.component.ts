import { Component,OnInit } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { Documentapproval } from 'src/app/model/documentapproval';
import { DocumentService } from 'src/app/service/document.service';

@Component({
  selector: 'app-documentapproval',
  templateUrl: './documentapproval.component.html',
  styleUrls: ['./documentapproval.component.css']
})
export class DocumentapprovalComponent implements OnInit {

  documents:Documentapproval[]=[];
  error:String='';
  showPdf: boolean = false; 
  selectedDocumentId: number | null = null; 

  constructor(private documentService: DocumentService){}

  ngOnInit(): void {
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

  approvedocument(id: number) {
    this.documentService.approvedocument(id).subscribe({
      next: (response: AppResponse) => {
        this.ngOnInit();
       
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  togglePdfViewer(documentId: number): void {
   
    this.showPdf = !this.showPdf;
    this.selectedDocumentId = this.showPdf ? documentId : null;
  }
}
