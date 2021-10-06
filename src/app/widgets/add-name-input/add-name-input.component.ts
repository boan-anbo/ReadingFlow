import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoggingService} from "../../core/services/logging/logging.service";

@Component({
  selector: 'app-add-name-input',
  templateUrl: './add-name-input.component.html',
  styleUrls: ['./add-name-input.component.scss']
})
export class AddNameInputComponent implements OnInit {
  _newEntityName: string = '';
  @Input() defaultName = '';
  @Input() entityName = 'Entity';
  @Output() createNewEntity: EventEmitter<string> = new EventEmitter<string>();


  constructor(
    private log: LoggingService
  ) {
  }

  ngOnInit(): void {
    this.log.info("Add Name Input Init")
    this._newEntityName = this.defaultName;
  }

  async addEntity(newEntityName: string) {

    this.createNewEntity.emit(newEntityName);
    this._newEntityName = this.defaultName;

  }
}
