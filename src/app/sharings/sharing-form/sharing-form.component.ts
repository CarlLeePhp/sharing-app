import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/_models/Category';
import { Sharing } from 'src/app/_models/Sharing';
import { CategoriesService } from 'src/app/_services/categories.service';
import { SharingService } from 'src/app/_services/sharing.service';

@Component({
  selector: 'app-sharing-form',
  templateUrl: './sharing-form.component.html',
  styleUrls: ['./sharing-form.component.css'],
})
export class SharingFormComponent implements OnInit {
  sharing: Sharing;
  categories: Category[] = [];

  constructor(
    private sharingService: SharingService,
    private categoriesService: CategoriesService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSharing();
    this.getCategories();
  }
  getSharing() {
    this.sharing = this.sharingService.currentSharing;
  }
  getCategories() {
    this.categoriesService.getCategories().subscribe((resp) => {
      this.categories = resp;
    });
  }
  saveSharing() {
    this.sharing.availableQty = this.sharing.portionQty - this.sharing.keepQty;
    // for (let i = 0; i < this.categories.length; i++) {
    //   if (this.sharing.categoryId == this.categories[i].id) {
    //     this.sharing.category = this.categories[i];
    //     break;
    //   }
    // }
    // chekc each input

    let errors: string[] = this.checkForm();

    if (errors.length > 0) {
      for (let i = 0; i < errors.length; i++) {
        this.toastr.error(errors[i]);
      }
      return;
    }
    this.sharing.category = null;
    if (this.sharing.status == 0) {
      this.sharingService.createSharing(this.sharing).subscribe(() => {
        this.toastr.info('Sharing Created');
        this.router.navigateByUrl('/sharing');
      });
    } else {
      this.sharingService.updateSharing(this.sharing).subscribe(() => {
        this.toastr.info('Sharing Saved');
        this.router.navigateByUrl('/sharing');
      });
    }
  }
  checkForm(): string[] {
    let errors: string[] = [];
    if (this.sharing.productDescription == '') {
      errors.push('Product Title cannot be empty');
    }
    if (this.sharing.portionDescription == '') {
      errors.push('Portion Description cannot be empty');
    }
    if (this.sharing.categoryId == 0) {
      errors.push('Product Title cannot be empty');
    }
    console.log(this.sharing.deadline);
    if (!this.sharing.deadline) {
      errors.push('Select a valid date');
    }
    if (this.sharing.portionQty == 0) {
      errors.push('Set a Portion Qty');
    }
    if (this.sharing.keepQty == 0) {
      errors.push('How much you want to keep');
    }
    if (this.sharing.portionPrice == 0) {
      errors.push('Set a Portion Price');
    }
    if (this.sharing.howToShare == '') {
      errors.push('Set how to share it');
    }
    return errors;
  }
}
