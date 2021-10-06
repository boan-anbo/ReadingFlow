import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../models/item";
import {ItemEntity} from "../../../common/backend/rf-client";

@Component({
  selector: 'app-item-rating',
  templateUrl: './item-rating.component.html',
  styleUrls: ['./item-rating.component.scss']
})
export class ItemRatingComponent implements OnInit {
  @Input() item: ItemEntity;

  constructor() { }

  ngOnInit(): void {
  }

}
