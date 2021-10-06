import {Component, Input, OnInit} from '@angular/core';
import {ItemFileEntity} from "../../common/backend/rf-client";
import {FileService} from "../../common/services/file.service";

@Component({
  selector: 'app-item-file',
  templateUrl: './item-file.component.html',
  styleUrls: ['./item-file.component.scss']
})
export class ItemFileComponent implements OnInit {
  @Input() itemFile: ItemFileEntity;
  @Input() detailed: boolean = false;

  constructor(
    public fileService: FileService
  ) { }

  ngOnInit(): void {
  }

  toggleDetail(e: MouseEvent) {
    e.stopPropagation();
    this.detailed = !this.detailed;
  }

  async viewPathInFolder(e: MouseEvent, filePath: string) {
    e.stopPropagation();
    await this.fileService.showFileInFolder(filePath)
  }
}
