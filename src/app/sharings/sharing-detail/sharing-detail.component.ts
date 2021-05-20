import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AppComment } from 'src/app/_models/AppComment';
import { Joining } from 'src/app/_models/Joining';
import { Sharing } from 'src/app/_models/Sharing';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { CommentsService } from 'src/app/_services/comments.service';
import { JoiningsService } from 'src/app/_services/joinings.service';
import { MembersService } from 'src/app/_services/members.service';
import { SharingService } from 'src/app/_services/sharing.service';

@Component({
  selector: 'app-sharing-detail',
  templateUrl: './sharing-detail.component.html',
  styleUrls: ['./sharing-detail.component.css'],
})
export class SharingDetailComponent implements OnInit {
  sharing: Sharing;
  joining: Joining = {
    id: 0,
    sharingId: 0,
    sharing: null,
    joinUserId: 0,
    joinQty: 0,
    status: 0,
  };
  isJoined: boolean = false; // The user joined this sharing before.
  isOwned: boolean = false; // The sharing is published by the user.
  joiningQty: number = 0;
  user: User;
  message: string;
  comments: AppComment[] = [];

  constructor(
    private sharingService: SharingService,
    private joiningService: JoiningsService,
    public accountService: AccountService,
    private membersService: MembersService,
    private toastr: ToastrService,
    private commentService: CommentsService,
    private router: Router
  ) {
    this.sharing = this.sharingService.detailSharing;
    //this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
    //  this.user = user;
    //});
  }

  ngOnInit(): void {
    this.joining.sharingId = this.sharing.id;
    // this.checkJoined();
    // this.checkOwned();
    this.getComments();
  }
  getComments() {
    this.commentService
      .getCommentsBySharing(this.sharing.id)
      .subscribe((comments) => {
        this.comments = comments;
      });
  }
  checkJoined() {
    this.joiningService
      .getJoiningsByUser(this.user.email)
      .subscribe((joinings) => {
        for (let i = 0; i < joinings.length; i++) {
          if (this.sharing.id == joinings[i].sharing.id) {
            this.isJoined = true;
          }
        }
      });
  }
  checkOwned() {
    this.membersService.getMember(this.user.email).subscribe((member) => {
      if (member.id == this.sharing.appUserId) this.isOwned = true;
    });
  }

  joinSharing() {
    this.joining.joinQty = this.joiningQty;
    if (this.joiningQty > this.sharing.availableQty) {
      this.toastr.error('More than available');
      return;
    }
    this.joiningService.createJoining(this.joining).subscribe(() => {
      this.toastr.info('Join Successfully');
      this.router.navigateByUrl('/home');
    });
  }
}
