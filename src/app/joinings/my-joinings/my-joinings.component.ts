import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Joining } from 'src/app/_models/Joining';
import { Sharing } from 'src/app/_models/Sharing';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { CommentsService } from 'src/app/_services/comments.service';
import { JoiningsService } from 'src/app/_services/joinings.service';

@Component({
  selector: 'app-my-joinings',
  templateUrl: './my-joinings.component.html',
  styleUrls: ['./my-joinings.component.css'],
})
export class MyJoiningsComponent implements OnInit {
  ongoingJoinings: Joining[] = [];
  achievedJoinings: Joining[] = [];
  completedJoinings: Joining[] = [];
  joinings: Joining[] = [];
  user: User;

  constructor(
    private joiningsService: JoiningsService,
    private accountService: AccountService,
    private commentsService: CommentsService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.getJoinings();
  }

  getJoinings() {
    this.joiningsService
      .getJoiningsByUser(this.user.email)
      .subscribe((joinings) => {
        this.joinings = joinings;
        for (let i = 0; i < joinings.length; i++) {
          switch (joinings[i].sharing.status) {
            case 2:
              this.ongoingJoinings.push(joinings[i]);
              break;
            case 3:
              this.achievedJoinings.push(joinings[i]);
              break;
            case 4:
              this.completedJoinings.push(joinings[i]);
              break;
            default:
              break;
          }
        }
      });
  }

  addQty(id) {
    for (let i = 0; i < this.ongoingJoinings.length; i++) {
      if (
        this.ongoingJoinings[i].id == id &&
        this.ongoingJoinings[i].sharing.availableQty > 0
      ) {
        this.ongoingJoinings[i].joinQty++;
        this.ongoingJoinings[i].sharing.availableQty--;
        break;
      }
    }
  }

  reduce(id) {
    for (let i = 0; i < this.ongoingJoinings.length; i++) {
      if (
        this.ongoingJoinings[i].id == id &&
        this.ongoingJoinings[i].joinQty > 0
      ) {
        this.ongoingJoinings[i].joinQty--;
        this.ongoingJoinings[i].sharing.availableQty++;
        break;
      }
    }
  }
  updateQty(id) {
    for (let i = 0; i < this.ongoingJoinings.length; i++) {
      if (this.ongoingJoinings[i].id == id) {
        this.joiningsService
          .updateQty(this.ongoingJoinings[i])
          .subscribe(() => {
            this.toastr.info('Update successfully');
          });
        break;
      }
    }
  }

  updateStatus(id) {
    for (let i = 0; i < this.achievedJoinings.length; i++) {
      if (this.achievedJoinings[i].id == id) {
        this.achievedJoinings[i].status = 1;
        this.joiningsService
          .updateStatus(this.achievedJoinings[i])
          .subscribe(() => {
            this.toastr.info('Update successfully');
          });
      }
    }
  }
  commentSharing(sharing: Sharing) {
    this.commentsService.selectedSharing = sharing;
    this.router.navigateByUrl('/comment-form');
  }
}
