import {testPDFFile} from './test-consts';
import * as fs from 'fs';
import {FileUtils} from "../file-node";

describe('Test file', () => {
  it('should get file info', async () => {
    const fileStat = await FileUtils.getFileInfo(testPDFFile);
    console.log(fileStat);
    expect(fileStat.size).toBeGreaterThan(2704819);
    expect(fileStat.isFile()).toBeTruthy();
    expect(fileStat).toBeInstanceOf(fs.Stats);
  });

  describe('should get file name and ext', () => {
    it('should get ext name', () => {

      expect(FileUtils.getFileExtName(testPDFFile)).toBe('.pdf');
    });

    it('should get ext name', () => {

      expect(FileUtils.getFileNameWithoutExt(testPDFFile)).toBe('test-pdf.pdf');
    });

    it('should get base dir name', () => {

      expect(FileUtils.getFileDirName(testPDFFile)).toContain('\\readingflowe\\lib\\tests\\test-file');

    });
  });
});
