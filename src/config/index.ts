import * as jsonfile from 'jsonfile';

import { Core } from '../interfaces';

export function load(path: string): Promise<Core.Config> {
  return jsonfile.readFile(path);
}

export async function save(_config: Core.Config, _path: string) {}

export async function make(_path: string) {}
