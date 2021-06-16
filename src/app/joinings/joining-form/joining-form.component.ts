import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Joining } from 'src/app/_models/Joining';
import { Sharing } from 'src/app/_models/Sharing';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { JoiningsService } from 'src/app/_services/joinings.service';
import { MembersService } from 'src/app/_services/members.service';
import { SharingService } from 'src/app/_services/sharing.service';

@Component({
  selector: 'app-joining-form',
  templateUrl: './joining-form.component.html',
  styleUrls: ['./joining-form.component.css'],
})
export class JoiningFormComponent implements OnInit {
  user: User;
  sharing: Sharing;
  joining: Joining = {
    id: 0,
    sharingId: 0,
    sharing: null,
    joinUserId: 0,
    joinQty: 0,
    status: 0,
  };
  joiningQty: number = 0;
  isJoined: boolean = false; // The user joined this sharing before.
  isOwned: boolean = false; // The sharing is published by the user.

  constructor(
    private sharingService: SharingService,
    public accountService: AccountService,
    private membersService: MembersService,
    private joiningService: JoiningsService,
    public bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.sharing = this.sharingService.detailSharing;
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.checkJoined();
    this.checkOwned();
  }

  joinSharing() {
    this.joining.joinQty = this.joiningQty;
    this.joining.sharingId = this.sharing.id;
    if (this.joiningQty == 0) {
      this.toastr.error('Quantity cannot be 0');
      return;
    }
    if (this.joiningQty > this.sharing.availableQty) {
      this.toastr.error('More than available');
      return;
    }
    this.joiningService.createJoining(this.joining).subscribe(() => {
      this.toastr.info('Join Successfully');
      this.bsModalRef.hide();
      this.router.navigateByUrl('/joinings');
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
}
