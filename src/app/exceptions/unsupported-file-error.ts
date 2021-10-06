
export class UnsupportedFileError extends Error{

  constructor(filePath: string) {
    super(`${filePath} is an unsupported file.`);
  }
}
