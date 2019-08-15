import * as fs from 'fs';
import { join } from 'path';
import * as util from 'util';

import { Core } from '../../interfaces';

const readdir = util.promisify(fs.readdir);
const status = util.promisify(fs.stat);

export async function make(path: string, alias: string): Promise<Core.Config> {
  const config: Core.Config = { packs: [] };
  const pack: Core.Pack = {
    alias,
    availableVersions: [],
    files: [],
    version: '',
  };

  pack.availableVersions = await getSubDirectories(path);

  config.packs.push(pack);

  return config;
}

export async function getSubDirectories(rootPath: string): Promise<string[]> {
  const paths = (await readdir(rootPath)).map(path => join(rootPath, path));

  return Promise.all(paths.map(async path => ({
    isDirectory: (await status(path)).isDirectory(),
    path,
  })))
    .then(files => {
      return files
        .filter(file => file.isDirectory)
        .map(file => file.path);
    });
}

export async function getFilesFromDirectory(_path: string): Promise<string[]> {
  return Promise.resolve([]);
}
