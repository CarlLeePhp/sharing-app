import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Category } from '../_models/Category';
import { Interest } from '../_models/Interest';
import { Member } from '../_models/Member';
import { Photo } from '../_models/Photo';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';
import { CategoriesService } from '../_services/categories.service';
import { InterestsService } from '../_services/interests.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('profileForm') profileForm: NgForm;
  member: Member = null;
  user: User = null;
  categories: Category[] = [];
  categoryId: number = 0;
  fileName: string;
  selectedFile: File;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.profileForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private membersService: MembersService,
    private accountService: AccountService,
    private categoriesService: CategoriesService,
    private interestsService: InterestsService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.getMember();
    this.getCategories();
  }

  getMember() {
    this.membersService.getMember(this.user.email).subscribe((member) => {
      this.member = member;
    });
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  updateMember() {
    console.log(this.member);
    this.membersService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      this.profileForm.reset(this.member);
    });
  }

  addInterest() {
    if (this.categoryId == 0) return;
    for (let i = 0; i < this.member.interests.length; i++) {
      if (this.member.interests[i].categoryId == this.categoryId) {
        this.toastr.error('You aready added it');
        return;
      }
    }
    let interest: Interest = {
      id: 0,
      appUserId: this.member.id,
      categoryId: this.categoryId,
      category: null,
    };

    this.interestsService.addInterest(interest).subscribe(() => {
      this.toastr.info('Add an interest');
      this.getMember();
    });
  }
  deleteInterest(id) {
    this.interestsService.deleteInterest(id).subscribe(() => {
      this.toastr.info('Interest deleted');
      for (let i = 0; i < this.member.interests.length; i++) {
        if (this.member.interests[i].id == id) {
          this.member.interests.splice(i, 1);
          break;
        }
      }
    });
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.selectedFile = file;
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      this.membersService
        .uploadePicture(this.selectedFile)
        .subscribe((resp) => {
          this.member.photoUrl = resp.url;
        });
    }
  }
}
