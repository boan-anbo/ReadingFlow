import *  as fs from 'fs';
import * as path from 'path';

const fsPromises = fs.promises;
export namespace Lib {
  namespace FileUtils {
    export const getFileInfo = async (filePath: string): Promise<fs.Stats> => await fsPromises.stat(filePath);

    export const getFileExtName = (fileName: string): string => path.extname(fileName);

    export const getFileNameWithoutExt = (fileName: string): string => path.basename(fileName);

    export const getFileDirName = (fileName: string): string => path.dirname(path.resolve(fileName));

  }

}
