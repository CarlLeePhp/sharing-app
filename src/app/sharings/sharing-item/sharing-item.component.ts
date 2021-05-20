import { Component, Input, OnInit } from '@angular/core';
import { Sharing } from 'src/app/_models/Sharing';

@Component({
  selector: 'app-sharing-item',
  templateUrl: './sharing-item.component.html',
  styleUrls: ['./sharing-item.component.css'],
})
export class SharingItemComponent implements OnInit {
  @Input() sharing: Sharing;

  constructor() {}

  ngOnInit(): void {}
}
