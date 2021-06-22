import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Member } from 'src/app/_models/Member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-sharer',
  templateUrl: './sharer.component.html',
  styleUrls: ['./sharer.component.css'],
})
export class SharerComponent implements OnInit {
  sharer: Member;
  constructor(
    public bsModalRef: BsModalRef,
    private membersService: MembersService
  ) {
    this.membersService
      .getMemberById(this.membersService.currentSharerId)
      .subscribe((member) => {
        this.sharer = member;
      });
  }

  ngOnInit(): void {}
}
