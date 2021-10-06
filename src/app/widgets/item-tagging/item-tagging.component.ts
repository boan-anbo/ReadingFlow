import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LoggingService} from "../../core/services/logging/logging.service";
import {ItemTaggingService} from "./item-tagging.service";
import {DataClient, EEntityType, TagCreateDto, TagEntity, TagLinkDto} from "../../common/backend/rf-client";
import {HubQuickMessageService} from "../../common/services/hub-quick-message.service";

@Component({
  selector: 'app-item-tagging',
  templateUrl: './item-tagging.component.html',
  styleUrls: ['./item-tagging.component.scss']
})
export class ItemTaggingComponent implements OnInit {

  @Input() itemType: EEntityType = EEntityType.ITEM;
  @Input() itemIds: string[] = [];
  @Input() itemTagIds: string[] = [];
  @Output() tagsApplied: EventEmitter<string[]> = new EventEmitter<string[]>();
  newTagName = '';

  constructor(
    public itemTaggingService: ItemTaggingService,
    private translate: TranslateService,
    private log: LoggingService,
    private data: DataClient,
    private hubQ: HubQuickMessageService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.log.info('ItemTaggingComponent INIT');
    this.updateAlreadySelectedTags();
    await this.itemTaggingService.loadTags()

  }

  async addTag(newTagName: string) {

    console.log(newTagName);
    await this.data.createTag(new TagCreateDto({
      name: newTagName,
      type: 'Regular'
    })).toPromise();
    this.log.info('Tag Created');
    this.newTagName = '';
    await this.refreshTags();
  }

  async refreshTags() {
    await this.itemTaggingService.loadTags();
  }


  async selectTag(tag: TagEntity) {
    this.log.info("Select Tag")
    this.itemTaggingService.selectedTags.toggle(tag.id);
    await this.applyTags();
  }

  isTagSelected(tag: TagEntity) {

    return this.itemTaggingService.selectedTags.isItemIdSelected(tag.id);
  }

  async applyTags() {
    const selectedTagIds = this.itemTaggingService.selectedTags.getSelectedIds();

    await this.data.addTagsToEntities(new TagLinkDto({
      tagIds: selectedTagIds,
      entityIds: this.itemIds,
      entityType: this.itemType

    })).toPromise();
    this.log.info("Tags Applied");
    await this.tagsApplied.emit(this.itemIds);
    // tell affected items and program items to reload
    // todo add list items as well.
    this.hubQ.tellProgramItemViewerToReloadModifiedItems(this.itemIds);

  }

  updateAlreadySelectedTags() {

  }
}
