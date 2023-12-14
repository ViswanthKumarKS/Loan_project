import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { authGuard } from './guard/auth.guard';
import { AccountComponent } from './component/account/account.component';
import { LoanComponent } from './component/loan/loan.component';
import { IntroComponent } from './component/intro/intro.component';
import { DocumentComponent } from './component/document/document.component';



import { AccountdetailsComponent } from './component/admin/accountdetails/accountdetails.component';
import { LoaapprovedComponent } from './component/admin/loanpproved/loaapproved.component';
import { DocumentapprovalComponent } from './component/admin/documentapproval/documentapproval.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard] },
  {path: 'account', component:AccountComponent, canActivate: [authGuard]},
  {path: 'document', component:DocumentComponent, canActivate: [authGuard]},
  {path: 'loan', component:LoanComponent, canActivate: [authGuard]},
  {path: 'intro', component:IntroComponent, canActivate: [authGuard]},
  
  
  {path: 'accountdetails', component:AccountdetailsComponent, canActivate: [authGuard]},
  {path: 'loanapproved', component:LoaapprovedComponent, canActivate: [authGuard]},
  {path: 'documentapproval', component:DocumentapprovalComponent, canActivate: [authGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
