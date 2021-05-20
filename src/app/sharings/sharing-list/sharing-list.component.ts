import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sharing } from 'src/app/_models/Sharing';
import { SharingService } from 'src/app/_services/sharing.service';

@Component({
  selector: 'app-sharing-list',
  templateUrl: './sharing-list.component.html',
  styleUrls: ['./sharing-list.component.css'],
})
export class SharingListComponent implements OnInit {
  @Input() sharings: Sharing[];

  constructor(private router: Router, private sharingService: SharingService) {}

  ngOnInit(): void {}

  goDetail(id) {
    for (let i = 0; i < this.sharings.length; i++) {
      if (this.sharings[i].id == id) {
        this.sharingService.detailSharing = this.sharings[i];
        this.router.navigateByUrl('/sharing-detail');
        break;
      }
    }
  }
}
