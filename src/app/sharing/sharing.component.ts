import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Sharing } from '../_models/Sharing';
import { User } from '../_models/User';
import { Category } from '../_models/Category';
import { AccountService } from '../_services/account.service';
import { SharingService } from '../_services/sharing.service';

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.css'],
})
export class SharingComponent implements OnInit {
  user: User = null;
  savedSharings: Sharing[] = [];
  publishedSharings: Sharing[] = [];
  achievedSharings: Sharing[] = [];
  completedSharings: Sharing[] = [];
  fileName: string;
  selectedFile: File;

  constructor(
    private sharingService: SharingService,
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {
    accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.getSharings();
  }
  getSharings() {
    this.sharingService
      .getSharingsByUser(this.user.email)
      .subscribe((sharings) => {
        for (let i = 0; i < sharings.length; i++) {
          switch (sharings[i].status) {
            case 1:
              this.savedSharings.push(sharings[i]);
              break;
            case 2:
              this.publishedSharings.push(sharings[i]);
              break;
            case 3:
              this.achievedSharings.push(sharings[i]);
              break;
            case 4:
              this.completedSharings.push(sharings[i]);
              break;
            default:
              break;
          }
        }
      });
  }
  newSharing() {
    this.sharingService.currentSharing = {
      id: 0,
      status: 0,
      productDescription: '',
      portionDescription: '',
      portionPrice: 0,
      portionQty: 0,
      deadline: null,
      howToShare: '',
      availableQty: 0,
      keepQty: 0,
      savedDate: new Date(),
      publishedDate: new Date(),
      achievedDate: new Date(),
      appUserId: 0,
      category: {
        id: 0,
        description: '',
      },
      categoryId: 0,
      photoUrl: '',
      photoPublicId: '',
    };
    this.router.navigateByUrl('/sharingForm');
  }
  editSharing(id) {
    let sharing: Sharing;
    for (let i = 0; i < this.savedSharings.length; i++) {
      if (this.savedSharings[i].id == id) {
        sharing = this.savedSharings[i];
        break;
      }
    }
    if (sharing == null) return;
    this.sharingService.currentSharing = sharing;
    this.router.navigateByUrl('/sharingForm');
  }
  publishSharing(id) {
    let sharing: Sharing;
    for (let i = 0; i < this.savedSharings.length; i++) {
      if (this.savedSharings[i].id == id) {
        sharing = this.savedSharings[i];
        this.publishedSharings.push(this.savedSharings[i]);
        this.savedSharings.splice(i, 1);
        break;
      }
    }
    if (sharing == null) return;
    sharing.status = 2;
    let tmpCategory: Category = sharing.category;
    sharing.category = null;
    this.sharingService.updateSharing(sharing).subscribe(() => {
      this.toastr.info('Sharing Published');
      sharing.category = tmpCategory;
    });
  }
  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.selectedFile = file;
    }
  }

  uploadFile(id) {
    if (this.selectedFile) {
      console.log('Sharing id: ' + id);
      console.log('File Name: ' + this.selectedFile.name);
      this.sharingService
        .uploadePicture(this.selectedFile, id)
        .subscribe((resp) => {
          for (let i = 0; i < this.savedSharings.length; i++) {
            if (this.savedSharings[i].id == id) {
              this.savedSharings[i].photoUrl = resp.url;
              break;
            }
          }
        });
    }
  }
}
