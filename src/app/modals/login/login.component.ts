import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {
    email: '',
    password: '',
  };

  constructor(
    public bsModalRef: BsModalRef,
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe(
      () => {
        this.bsModalRef.hide();
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }
  forgotPassword() {
    this.bsModalRef.hide();
    this.router.navigateByUrl('/forgot-password');
  }
}
