import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Register } from 'src/app/model/register';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registers: Register[] = [];
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };

  constructor(
    private registerService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  nameRef: String = '';
  password: String = '';
  error: String = '';
  person: String = '';

  onSubmit(form: any) {
    const newregister: Register = {
      username: this.nameRef,
      password: this.password,
      name: this.person,
    };
    console.log(newregister);
    this.registerService.register(newregister).subscribe({
      next: (response: AppResponse) => {
        this.registers.push(response.data);
        this.router.navigate(['/login']);

        this.toastr.success('registered successfully');
      },
    });
  }
}
