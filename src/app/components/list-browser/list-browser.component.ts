import {Component, Input, OnInit} from '@angular/core';
import {ListBrowserService} from './list-browser.service';
import {TranslateService} from '@ngx-translate/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {ListEntity} from '../../common/backend/rf-client';
import {ListItemService} from '../list-item/list-item.service';
import {ListViewerService} from '../list/list-viewer.service';
import {RoutingService} from '../../common/services/routing.service';
import {ROUTES} from '../../ROUTES';
import {RoutingQuickService} from "../../common/services/routing-quick.service";
import {DataQuickService} from "../../common/services/data-quick.service";

@Component({
  selector: 'app-list-browser',
  templateUrl: './list-browser.component.html',
  styleUrls: ['./list-browser.component.scss']
})
export class ListBrowserComponent implements OnInit {

  constructor(
    private listBrowserService: ListBrowserService,
    private translate: TranslateService,
    private log: LoggingService,
    private listViewer: ListViewerService,
    private route: RoutingService,
    private routeQ: RoutingQuickService,
    private dataQ: DataQuickService
  ) { }

  async ngOnInit(): Promise<void> {
    this.log.info('ListBrowserComponent INIT');
    this.clearLists();
    await this.listBrowserService.loadProjectLists();
  }


  getLists(): ListEntity[] {
    return this.listBrowserService.lists;
  }

  clearLists() {
    this.listBrowserService.lists = [];
  }

  async toList(list: ListEntity) {
    this.listViewer.currentListId = list.id;
    await this.routeQ.toListViewerFirstReload()
  }

  async onNewListCreated(newListName: string) {
    await this.dataQ.createListInCurrentProject(newListName);
    await this.listBrowserService.loadProjectLists();
  }
}
