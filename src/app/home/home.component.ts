import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sharing } from '../_models/Sharing';
import { SharingService } from '../_services/sharing.service';
import { take } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: User = {
    email: 'none',
    userName: 'someone',
    token: '',
  };
  registerMode = false;
  baseUrl = environment.apiUrl;
  sharings: Sharing[] = [];
  publishedSharings: Sharing[] = [];
  completedSharings: Sharing[] = [];
  recommendSharings: Sharing[] = [];

  constructor(
    private sharingService: SharingService,
    public accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.getSharings();
    if (this.user) {
      this.getRecommendSharings();
    }
  }
  getRecommendSharings() {
    this.sharingService
      .getRecommendSharings(this.user.email)
      .subscribe((sharings) => {
        this.recommendSharings = sharings;
      });
  }
  getSharings() {
    this.sharingService.getSharings().subscribe((sharings) => {
      for (let i = 0; i < sharings.length; i++) {
        switch (sharings[i].status) {
          case 2:
            if (this.publishedSharings.length < 8)
              this.publishedSharings.push(sharings[i]);
            break;
          case 4:
            if (this.completedSharings.length < 8)
              this.completedSharings.push(sharings[i]);
            break;
          default:
            break;
        }
      }
    });
  }

  // registerToggle() {
  //   this.registerMode = !this.registerMode;
  // }

  // cancelRegisterMode(event: boolean) {
  //   this.registerMode = event;
  // }
}
