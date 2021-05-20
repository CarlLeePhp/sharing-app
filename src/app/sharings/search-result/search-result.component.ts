import { Component, Input, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  RouterEvent,
  NavigationEnd,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { Sharing } from 'src/app/_models/Sharing';
import { SharingService } from 'src/app/_services/sharing.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  sharings: Sharing[] = [];
  categoryId: number = 0;
  keyword: string = '';
  navigationSubscription;
  constructor(
    public sharingService: SharingService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.categoryId = Number.parseInt(
          this.activatedRoute.snapshot.paramMap.get('categoryId')
        );
        this.keyword = this.activatedRoute.snapshot.paramMap.get('keyword');
        this.getSharings();
      }
    });
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  getSharings() {
    this.sharingService
      .searchSharings(this.categoryId, this.keyword)
      .subscribe((sharings) => {
        this.sharings = sharings;
      });
  }
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
