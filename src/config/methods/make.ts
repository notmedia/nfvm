import * as fs from 'fs';
import * as util from 'util';

import { Core } from '../../interfaces';

const readdir = util.promisify(fs.readdir);
const status = util.promisify(fs.stat);

export async function make(_path: string): Promise<Core.Config> {
  // const config: Core.Config = {};
  return {} as Core.Config;
}

export async function getSubDirectories(rootPath: string): Promise<string[]> {
  const paths = await readdir(rootPath);

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
