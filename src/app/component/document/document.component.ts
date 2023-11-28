import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Document } from 'src/app/model/document';
import { DocumentService } from 'src/app/service/document.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})
export class DocumentComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/document.json',
  };

  documents: Document[] = [];
  error: String = '';

  file: any = '';
  isBoolean: boolean = false;

  fileSizeLimit = 5242880; // 5 MB in bytes
  allowedFileTypes = ['.pdf', '.doc', '.docx'];

  fileSizeError = false;
  fileTypeError = false;

  onFileSelected(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];

      // console.log('Selected file',this.file);
    }
  }

  constructor(
    private documentService: DocumentService,
    private storageService: StorageService
  ) {}

  user: AppUser = this.storageService.getLoggedInUser();
  showPdf: boolean = false; 
  selectedDocumentId: number | null = null; 

  ngOnInit(): void {
    this.documentService.getdocumentdetails(this.user.id).subscribe({
      next: (response: AppResponse) => {
        this.documents.push(response.data);
        console.log(this.documents);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  submitForm(form: any) {
    if (form.invalid || this.fileSizeError || this.fileTypeError) {
      // Handle invalid form
      return;
    }
    const formData = new FormData();
    formData.append('documentFile', this.file);
    formData.append('user_id', this.user.id.toString());
    // formData.append('isBoolean',this.isBoolean.toString());
    formData.append('documentName', this.file.name);

    console.log(formData);

    this.documentService.uploadDocument(formData).subscribe({
      next: (response: AppResponse) => {
        this.documents = response.data;
        const uploadedDocumentId = response.data.id;
        console.log('Document uploaded successfully:', response.data);
      },
      error: (err) => {
        console.error('Error uploading document:', err);
      },
    });
  }

  togglePdfViewer(documentId: number): void {
   
    this.showPdf = !this.showPdf;
    this.selectedDocumentId = this.showPdf ? documentId : null;
  }
}
