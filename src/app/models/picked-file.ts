export class PickedFile {
  constructor(filePath: string) {
    this.filePath = filePath;
  }
  filePath: string;
  selected = true;
}
