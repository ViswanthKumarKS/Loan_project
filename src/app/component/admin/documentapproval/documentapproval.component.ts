import { Component, OnInit } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { Documentapproval } from 'src/app/model/documentapproval';
import { DocumentService } from 'src/app/service/document.service';

@Component({
  selector: 'app-documentapproval',
  templateUrl: './documentapproval.component.html',
  styleUrls: ['./documentapproval.component.css'],
})
export class DocumentapprovalComponent implements OnInit {
  documents: Documentapproval[] = [];
  error: String = '';
  showPdf: boolean = false;
  selectedDocumentId: number | null = null;

  constructor(private documentService: DocumentService) {}

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
  openPdfInNewWindow(documentId: number): void {
    const pdfUrl =
      'http://localhost:8080/api/DocumentType/downloadFile/' + documentId;
    const newWindow = window.open('', '_target', 'height=600,width=800');

    if (newWindow) {
      // Embed the PDF.js viewer in the new window
      newWindow.document.write(`
      <html>
      <head>
        <title>PDF Viewer</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js"></script>
      </head>
      <body>
      <embed src="${pdfUrl}" type="application/pdf" width="100%" height="100%" />
  </body>
      </html>
    `);
    }
  }

  togglePdfViewer(documentId: number): void {
    this.selectedDocumentId = documentId;
    this.openPdfInNewWindow(documentId);
  }
}
