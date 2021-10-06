import {Component, Input, OnInit} from '@angular/core';
import {ProgramItemEntity} from "../../common/backend/rf-client";

@Component({
  selector: 'app-program-item-detail',
  templateUrl: './program-item-detail.component.html',
  styleUrls: ['./program-item-detail.component.scss']
})
export class ProgramItemDetailComponent implements OnInit {
  @Input() programItem: ProgramItemEntity;

  constructor() { }

  ngOnInit(): void {
  }

}
