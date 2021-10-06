import {Component, Input, OnInit} from '@angular/core';
import {ItemControlService} from './item-control.service';
import {TranslateService} from '@ngx-translate/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {ITEM_TYPES} from "../../consts/item-types";

@Component({
  selector: 'app-item-control',
  templateUrl: './item-control.component.html',
  styleUrls: ['./item-control.component.scss']
})
export class ItemControlComponent implements OnInit {


  constructor(
    public itemControlService: ItemControlService,
    private translate: TranslateService,
    private log: LoggingService
  ) { }

  ngOnInit(): void {
   }

  onTagsApplied(taggedItemIds: string[]) {

  }
}
