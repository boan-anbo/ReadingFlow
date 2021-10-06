import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ListItemService} from './list-item.service';
import {FileService} from '../../common/services/file.service';
import {FileViewerService} from '../../common/services/file-viewer.service';
import {ProjectService} from '../../common/services/project.service';
import {ClickItemEvent} from "../../interfaces/ClickItemEvent";
import {ClickListItemEvent} from "../../interfaces/ClickListItemEvent";
import {DataClient, ItemEntity, ListClient, ListItemEntity} from "../../common/backend/rf-client";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Output() listItemClicked = new EventEmitter<ClickListItemEvent>();
  @Input() selected = false;
  @Output() itemToDelete = new EventEmitter<ItemEntity>();
  @Input() listItem: ListItemEntity;

  constructor(
    private itemService: ListItemService,
    private dataService: ProjectService,
    private fileService: FileService,
    private fileViewerService: FileViewerService,
    private data: DataClient,
    private rfList: ListClient
  ) {
  }

  ngOnInit(): void {
    // console.log('ItemComponent INIT');
  }

  onItemDelete(itemToDelete: ItemEntity) {
    this.itemToDelete.emit(itemToDelete);
  }

  async toggleSkip(listItem: ListItemEntity) {
    await this.rfList.toggleListItemSkip(listItem.id).toPromise();
    await this.reloadListItem();
  }

  async reloadListItem() {
    this.listItem = await this.rfList.getListItem(this.listItem.id).toPromise();
  }

  // Item is ignore because the list should operate on list item as a whole
  onItemClicked(clickItemEvent: ClickItemEvent) {
    this.listItemClicked.emit(
      {
        listItem: this.listItem,
        event: clickItemEvent.event
      });
  }
}
