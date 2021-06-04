import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/Member';
import { MembersService } from 'src/app/_services/members.service';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  members: Member[];
  model: any = {
    email: '',
    userName: '',
    password: '',
  };
  confirmPassword: string = '';
  isEmailEmpty: boolean = false;
  isEmailExist: boolean = false;
  isUserNameEmpty: boolean = false;
  isUserNameExist: boolean = false;
  isUserNameContainSpace: boolean = false;
  isPasswordEmpty: boolean = false;
  isPasswordConfirmEmpty: boolean = false;
  isPasswordsNotMatch: boolean = false;

  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.memberService.getMembers().subscribe((members) => {
      this.members = members;
    });
  }

  register() {
    let isError: boolean = false;
    this.isEmailEmpty = false;
    this.isEmailExist = false;
    this.isUserNameEmpty = false;
    this.isUserNameExist = false;
    this.isUserNameContainSpace = false;
    this.isPasswordEmpty = false;
    this.isPasswordConfirmEmpty = false;
    this.isPasswordsNotMatch = false;
    this.model.userName = this.model.userName.trim();
    if (this.model.email == null || this.model.email == '') {
      this.isEmailEmpty = true;
      isError = true;
    }
    if (this.model.userName == null || this.model.userName == '') {
      this.isUserNameEmpty = true;
      isError = true;
    }
    if (this.model.userName.includes(' ')) {
      this.isUserNameContainSpace = true;
      isError = true;
    }
    for (let i = 0; i < this.members.length; i++) {
      if (
        this.members[i].userName.toLowerCase() ==
        this.model.userName.toLowerCase()
      ) {
        this.isUserNameExist = true;
        isError = true;
      }

      if (
        this.members[i].email.toLowerCase() == this.model.email.toLowerCase()
      ) {
        this.isEmailExist = true;
        isError = true;
      }
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
