import {Component, Input, OnInit} from '@angular/core';
import {ListEntity} from "../../../common/backend/rf-client";

@Component({
  selector: 'app-list-info',
  templateUrl: './list-info.component.html',
  styleUrls: ['./list-info.component.scss']
})
export class ListInfoComponent implements OnInit {
  @Input() list: ListEntity;

  constructor() {
  }

  ngOnInit(): void {
  }



}
