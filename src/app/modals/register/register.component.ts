import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  confirmPassword: string = '';
  isEmailEmpty: boolean = false;
  isUserNameEmpty: boolean = false;
  isPasswordEmpty: boolean = false;
  isPasswordConfirmEmpty: boolean = false;
  isPasswordsNotMatch: boolean = false;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {}

  register() {
    let isError: boolean = false;
    this.isEmailEmpty = false;
    this.isUserNameEmpty = false;
    this.isPasswordEmpty = false;
    this.isPasswordConfirmEmpty = false;
    this.isPasswordsNotMatch = false;
    if (this.model.email == null || this.model.email == '') {
      this.isEmailEmpty = true;
      isError = true;
    }
    if (this.model.userName == null || this.model.userName == '') {
      this.isUserNameEmpty = true;
      isError = true;
    }
    if (this.model.password == null || this.model.password == '') {
      this.isPasswordEmpty = true;
      isError = true;
    }
    if (this.confirmPassword == null || this.confirmPassword == '') {
      this.isPasswordConfirmEmpty = true;
      isError = true;
    }
    if (this.model && this.model.password != this.confirmPassword) {
      this.isPasswordsNotMatch = true;
      isError = true;
    }

    if (isError) return;
    this.accountService.register(this.model).subscribe(
      (response) => {
        console.log(response);
        this.bsModalRef.hide();
      },
      (error) => {
        this.toastr.error(error.error);
      }
    );
  }
}
