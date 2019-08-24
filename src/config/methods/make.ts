import * as fs from 'fs';
import { basename, join } from 'path';
import * as util from 'util';

import { Core } from '../../interfaces';

const readdir = util.promisify(fs.readdir);
const status = util.promisify(fs.stat);

export async function makeConfig(packsInfo: { path: string, alias: string }[]): Promise<Core.Config> {
  const packs: Core.Pack[] = await Promise.all(packsInfo.map(pack => makePack(pack.path, pack.alias)));

  return { packs };
}

export async function makePack(
  path: string,
  alias: string,
  filePaths?: { filename: string, path: string }[],
): Promise<Core.Pack> {
  const pack: Core.Pack = {
    alias,
    availableVersions: [],
    files: [],
    version: '',
  };

  const directories: string[] = await getSubDirectories(path);

  const files: Core.File[] = [];

  await Promise.all(directories.map(async directory => {
    const filesFromDirectory = await getFilesFromDirectory(directory);
    for (const fileFromDirectory of filesFromDirectory) {
      const filename = basename(fileFromDirectory);
      files.push({
        filename,
        mode: 'symlink',
        path: filePaths ? mapFilenameToPath(filename, filePaths) : '',
        removeIfVersionNotExists: true,
        versions: [{
          alias: basename(directory),
          path: fileFromDirectory,
        }],
      } as Core.File);
    }
  }));

  pack.version = basename(directories[0]);
  pack.files = groupFilesByVersion(files);

  // pack.availableVersions = [...new Set(...pack.files.map(file => file.versions.map(version => version.alias)))];

  return pack;
}

export function mapFilenameToPath(filename: string, filePaths: { filename: string, path: string }[]): string {
  const filePath = filePaths.find(item => item.filename === filename);

  return filePath ? filePath.path : '';
}

export function groupFilesByVersion(files: Core.File[]): Core.File[] {
  return files;
}

export function getSubDirectories(path: string): Promise<string[]> {
  return getPaths(path, true);
}

export function getFilesFromDirectory(path: string): Promise<string[]> {
  return getPaths(path, false);
}

async function getPaths(rootPath: string, isDirectory: boolean): Promise<string[]> {
  const paths = (await readdir(rootPath)).map(path => join(rootPath, path));

  return Promise.all(paths.map(async path => ({
    isDirectory: (await status(path)).isDirectory(),
    path,
  })))
    .then(files => {
      return files
        .filter(file => isDirectory ? file.isDirectory : !file.isDirectory)
        .map(file => file.path);
    });
}
