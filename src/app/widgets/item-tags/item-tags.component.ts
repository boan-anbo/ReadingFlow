import {Component, Input, OnInit} from '@angular/core';
import {TagEntity} from "../../common/backend/rf-client";

@Component({
  selector: 'app-item-tags',
  templateUrl: './item-tags.component.html',
  styleUrls: ['./item-tags.component.scss']
})
export class ItemTagsComponent implements OnInit {
  @Input() tags: TagEntity[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
