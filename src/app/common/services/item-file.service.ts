import {Injectable} from '@angular/core';
import {ItemFileTypes} from "../../models/item-file-types";
import {TauriService} from "../../core/services";
import {UnsupportedFileError} from "../../exceptions/unsupported-file-error";
import {path} from "@tauri-apps/api";

/**
 * Between pure file and app files
 */
@Injectable({
  providedIn: 'root'
})
export class ItemFileService {

  constructor(
    private es: TauriService
  ) {
  }

  async pathToFileType(targetPath: string): Promise<ItemFileTypes> {
    const ext = (await path.extname(targetPath)).toUpperCase()
    // console.warn(ext)
    switch (ext) {
      case 'PDF':
        return ItemFileTypes.PDF;
      case 'DOC':
        return ItemFileTypes.DOC;
      case 'DOCX':
        return ItemFileTypes.DOC;
      case 'EPUB':
        return ItemFileTypes.EPUB;
      default:
        throw new UnsupportedFileError(targetPath);
    }
  }
}
