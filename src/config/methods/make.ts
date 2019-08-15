import * as fs from 'fs';
import { join } from 'path';
import * as util from 'util';

import { Core } from '../../interfaces';

const readdir = util.promisify(fs.readdir);
const status = util.promisify(fs.stat);

export async function make(_path: string, alias: string): Promise<Core.Config> {
  const config: Core.Config = { packs: [] };
  const pack: Core.Pack = {
    alias,
    availableVersions: [],
    files: [],
    version: '',
  };

  // const directories = await getSubDirectories(path);

  config.packs.push(pack);

  return config;
}

export async function makeFromConfig(_path: string, _config: Core.Config): Promise<Core.Config> {
  return Promise.resolve({} as Core.Config);
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
