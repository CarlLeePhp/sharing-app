import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  model: any = {
    email: '',
    password: '',
  };
  baseUrl = environment.apiUrl;

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  resetPassword() {
    if (this.model.email.length <= 0) {
      this.toastr.error('Please enter your email');
      return;
    }
    this.http
      .post(this.baseUrl + 'accounts/resetpw', this.model)
      .subscribe((resp) => {
        this.toastr.info('New password was sent to your email.');
        this.router.navigateByUrl('/home');
      });
  }
}
