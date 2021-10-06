import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  ConditionCreateDto,
  DataClient, EConditionGenre,
  EConditionType, RoutineClient,
  RoutineItemWithConditionCreateDto
} from "../../../common/backend/rf-client";
import {LoggingService} from "../../../core/services/logging/logging.service";

interface ConditionOption {
  name: string,
  value: EConditionType
}

@Component({
  selector: 'app-create-routine-item',
  templateUrl: './create-routine-item.component.html',
  styleUrls: ['./create-routine-item.component.scss']
})
export class CreateRoutineItemComponent implements OnInit {

  conditionTypes: ConditionOption [] = [
    {
      name: "item",
      value: EConditionType.Item
    },

    {
      name: "Genere",
      value: EConditionType.Genre
    },

  ]
  selectedType: EConditionType;
  @Input() routineId: string;
  @Input() sourceListIds: string[] = [];
  @Output() addedItem = new EventEmitter();

  constructor(
    private rfRoutine: RoutineClient,
    private log: LoggingService
  ) {
  }

  ngOnInit(): void {
  }

  async createRoutineItemName(routineItemName: string) {
    const conditions = [new ConditionCreateDto({
      type: this.selectedType,
      value: 1,
      genre: EConditionGenre.Unspecified
    })];
    const dto = new RoutineItemWithConditionCreateDto({
      conditionCreateDtos: conditions,
      routineId: this.routineId,
      sourceListIds: this.sourceListIds,
      routineName: routineItemName
    });
    this.log.info("Assembled Routine Item with Conditions Dto", dto)
    await this.rfRoutine.createRoutineItemWithConditions(dto).toPromise();
    // let parent routine viewer knw that a new routine item has been added.
    this.addedItem.emit();
  }
}
