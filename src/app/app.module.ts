import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';

import { AdminHomeComponent } from './component/admin/home/home.component';
import { LoaderInterceptorService } from './service/interceptor/loaderInterceptor.service';
import { AuthInterceptorService } from './service/interceptor/authInterceptor.service';
import { AccountComponent } from './component/account/account.component';
import { DocumentComponent } from './component/document/document.component';
import { LoanComponent } from './component/loan/loan.component';
import { IntroComponent } from './component/intro/intro.component';
import {SelectRequiredValidatorDirective} from './component/shared/select-required.directive';



import { AccountdetailsComponent } from './component/admin/accountdetails/accountdetails.component';
import { LoaapprovedComponent } from './component/admin/loanpproved/loaapproved.component';
import { DocumentapprovalComponent } from './component/admin/documentapproval/documentapproval.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatSliderModule } from '@angular/material/slider';


export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    AccountComponent,
    DocumentComponent,
    LoanComponent,
    IntroComponent,

   
    AccountdetailsComponent,
    LoaapprovedComponent,
    DocumentapprovalComponent,
    SelectRequiredValidatorDirective,
 
  ],
  imports: [
    BrowserModule,
    PdfViewerModule,
    AppRoutingModule,
    FormsModule,
  
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatSliderModule,
    LottieModule.forRoot({ player: playerFactory }),
  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
