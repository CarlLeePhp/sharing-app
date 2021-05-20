import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/Member';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members: Member[];
  baseUrl = environment.apiUrl;

  constructor(
    private membersService: MembersService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.http.get<Member[]>(this.baseUrl + 'users').subscribe((members) => {
      this.members = members;
    });
  }
}
