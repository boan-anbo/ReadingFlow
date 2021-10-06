import {Component, Input, OnInit} from '@angular/core';
import {ZoteroBrowserService} from './zotero-browser.service';
import {TranslateService} from "@ngx-translate/core";
import {LoggingService} from "../../core/services/logging/logging.service";
import {ZoteroCollection, ZoteroReturnDataOfZoteroCollection} from "../../common/backend/rf-client";
import {HubQuickMessageService} from "../../common/services/hub-quick-message.service";

@Component({
  selector: 'app-zotero-browser',
  templateUrl: './zotero-browser.component.html',
  styleUrls: ['./zotero-browser.component.scss']
})
export class ZoteroBrowserComponent implements OnInit {

  @Input() zoteroBrowser;

  constructor(
    public zoteroBrowserService: ZoteroBrowserService,
    private translate: TranslateService,
    private log: LoggingService,
    private hubQ: HubQuickMessageService
  ) {
  }

  ngOnInit(): void {
    this.log.info('ZoteroBrowserComponent INIT');
    this.zoteroBrowserService.loadAllZoteroCollections();
  }

  async addZoteroCollectionAsProjectList(collection: ZoteroReturnDataOfZoteroCollection) {
    await this.zoteroBrowserService.addZoteroCollectionAsProjectList(collection);
    await this.hubQ.tellListBrowserToReload();
  }
}
