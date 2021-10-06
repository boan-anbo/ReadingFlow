import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EImportSourceType, ImportSourceEntity} from "../../../../common/backend/rf-client";

@Component({
  selector: 'app-list-links',
  templateUrl: './list-links.component.html',
  styleUrls: ['./list-links.component.scss']
})
export class ListLinksComponent implements OnInit, OnChanges {
@Input() importSources: ImportSourceEntity[]
  zoteroSources: ImportSourceEntity [] = [];
  constructor() { }

  ngOnInit(): void {

    this.separateSources();
  }

  separateSources() {
    if (this.importSources?.length > 0) {
      this.zoteroSources = [];
      this.importSources.forEach(importSource => {
        if (importSource.sourceType === EImportSourceType.ZOTERO )
        {
          this.zoteroSources.push(importSource);
        }
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.zoteroSources?.length > 0) {
      this.separateSources();
    }
  }



}
