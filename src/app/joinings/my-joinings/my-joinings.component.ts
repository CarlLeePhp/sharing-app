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
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharerComponent } from 'src/app/modals/sharer/sharer.component';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-my-joinings',
  templateUrl: './my-joinings.component.html',
  styleUrls: ['./my-joinings.component.css'],
})
export class MyJoiningsComponent implements OnInit {
  ongoingJoinings: Joining[] = [];
  achievedJoinings: Joining[] = [];
  completedJoinings: Joining[] = [];
  expiredJoinings: Joining[] = [];
  joinings: Joining[] = [];
  user: User;
  bsModalRef: BsModalRef;

  constructor(
    private joiningsService: JoiningsService,
    private accountService: AccountService,
    private membersService: MembersService,
    private commentsService: CommentsService,
    private toastr: ToastrService,
    private router: Router,
    private bsModalService: BsModalService
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
            case -1:
              if (this.expiredJoinings.length < 20) {
                this.expiredJoinings.push(joinings[i]);
              }
              break;
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
            // Check the qty
            if (this.ongoingJoinings[i].sharing.availableQty == 0) {
              this.achievedJoinings.push(this.ongoingJoinings[i]);
              this.ongoingJoinings.splice(i, 1);
            }
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

  openModalWithComponent(id: number) {
    this.membersService.currentSharerId = id;
    this.bsModalRef = this.bsModalService.show(SharerComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
