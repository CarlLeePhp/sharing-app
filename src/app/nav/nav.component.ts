import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../modals/login/login.component';
import { RegisterComponent } from '../modals/register/register.component';
import { CategoriesService } from '../_services/categories.service';
import { Category } from '../_models/Category';
import { SharingService } from '../_services/sharing.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  bsModalRef: BsModalRef;
  model: any = {};
  categories: Category[] = [];
  categoryId: number = 0;
  keyword: string = '';

  constructor(
    public accountService: AccountService,
    private sharingService: SharingService,
    private router: Router,
    private toastr: ToastrService,
    private bsModalService: BsModalService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  openModalWithComponent() {
    this.bsModalRef = this.bsModalService.show(LoginComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  openModalWithRegister() {
    this.bsModalRef = this.bsModalService.show(RegisterComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  login() {
    this.accountService.login(this.model).subscribe(
      (Response) => {
        this.router.navigateByUrl('/members');
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  searchSharings() {
    if (this.keyword == '') {
      this.toastr.error('Please enter any keyword');
      return;
    }
    this.router.navigateByUrl(
      '/search-result/' + this.categoryId + '/' + this.keyword
    );
  }
}
