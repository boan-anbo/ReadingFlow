import {Component, OnInit} from '@angular/core';
import {ImporterService} from './importer.service';
import {FileService} from '../../common/services/file.service';
import {PickedFile} from '../../models/picked-file';
import {ListViewerService} from '../list/list-viewer.service';

@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.scss']
})
export class ImporterComponent implements OnInit {
  pickedFilesShown = false;

  constructor(
    public importerService: ImporterService,
    private fileService: FileService,
    private listService: ListViewerService
  ) {
  }

  ngOnInit(): void {
    this.importerService.list = this.listService.currentList;
    console.log('ImporterComponent INIT');
  }

  async pickFilesToImport() {
    this.importerService.pickedFiles = [];
    const pickedPaths = await this.fileService.pickMultiplePdfFiles();
    this.importerService.pickedFiles = pickedPaths.map(path => new PickedFile(path));

  }

  // addSelectedToProgram(): void {
  //   this.importerService.addSelectedToProgram();
  // }

  getPickedFiles() {
    return this.importerService.pickedFiles;
  }

  selectAll() {
    this.importerService.selectAll();
  }

  invertSelections() {
    this.importerService.invertSelect();
  }

  async addSelectedToList() {
    await this.importerService.addSelectedToList();
  }
}
