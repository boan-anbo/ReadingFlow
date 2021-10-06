import {Component, Input, OnInit} from '@angular/core';
import {RoutineItemService} from './routine-item.service';
import {TranslateService} from '@ngx-translate/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {
  DataClient,
  EConditionGenre,
  EConditionType, ListEntity,
  RoutineClient,
  RoutineItemEntity
} from '../../common/backend/rf-client';
import {DialogService} from "../../common/services/dialog.service";
import {RoutingQuickService} from "../../common/services/routing-quick.service";

@Component({
  selector: 'app-routine-item',
  templateUrl: './routine-item.component.html',
  styleUrls: ['./routine-item.component.scss']
})
export class RoutineItemComponent implements OnInit {

  @Input() routineItem: RoutineItemEntity;
  conditionGenres = EConditionGenre;
  conditionTypes = EConditionType;

  constructor(
    private routineItemService: RoutineItemService,
    private translate: TranslateService,
    private log: LoggingService,
    private rfClient: RoutineClient,
    private dialog: DialogService,
    private routeQ: RoutingQuickService
  ) {
  }

  ngOnInit(): void {
    this.log.info('RoutineItemComponent INIT');
  }

  async deleteRoutineItem(routineItem: RoutineItemEntity) {
    if (!this.dialog.confirm('You sure wanna delete this routine item?')) return;
    await this.rfClient.deleteRoutineItem(routineItem.id).toPromise();
    this.log.info('Routine Item Deleted', routineItem.id);
  }

  async toList(sourceList: ListEntity) {
    await this.routeQ.toListViewerFirstWithId(sourceList.id);
  }
}
