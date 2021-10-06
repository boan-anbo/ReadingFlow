import {Injectable} from '@angular/core';
import {Stats} from "fs";
import {CreateItemDto, DataClient, ItemEntity} from "../backend/rf-client";
import {LoggingService} from "../../core/services/logging/logging.service";

@Injectable({
  providedIn: 'root'
})
export class ItemImporterService {

  constructor(
    private data: DataClient,
    private log: LoggingService
  ) {
  }

  async filesToItems(filePaths: string[]): Promise<ItemEntity[]> {
    this.log.info("Sending create items request for files", filePaths);
    const results = await this.data.createItems(filePaths.map(path => new CreateItemDto({
      filePath: path,
      name: path
    }))).toPromise();

    this.log.info("Received created items from files", results);
    return results;
  }

  // async fileToItem(filePath: string, fileStat?: Stats): Promise<ItemEntity> {
  //   // const newItem = new Item(filePath);
  //   //
  //   // const newItemFile = new ItemFileEntity(filePath, fileStat);
  //   // this.dataService.addItemFileToItem(newItemFile, newItem);
  //   const [newItem] = await this.data.createItems([new CreateItemDto({
  //     filePath,
  //     name: filePath
  //   })]).toPromise();
  //   return newItem;
  // }
}
