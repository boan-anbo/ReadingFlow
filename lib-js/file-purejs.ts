export const getPathDirectoryPath = (fileFullPath: string): string => {
  const pathArray = fileFullPath.split(/[\/\\]/g);
  pathArray.pop();
  return pathArray.join('');
}
