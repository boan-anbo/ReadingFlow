import {OsTypes} from './os-types';

export class FileViewer {
  viewerPath: string;
  viewerName: string;
  defaultArguments: string [] = [];
  os: OsTypes;
}

export class Settings {
  defaultOpenPdfLocation: string = null;
  pdfEditors: FileViewer[] = [];
  defaultDocViewer: FileViewer = null;
  defaultEpubViewer: FileViewer = null;
  defaultPdfViewer: FileViewer = Object.assign(
    new FileViewer(),
    {
      viewerPath: 'C:\\Program Files (x86)\\FOXIT SOFTWARE\\FOXIT PHANTOMPDF\\FoxitPhantomPDF.exe',
      viewerName: 'Foxit Phantom',
      defaultArguments: [],
      os: OsTypes.WIN
    }
  );
}
