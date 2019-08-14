import * as jsonfile from 'jsonfile';

import { Core } from '../interfaces';

export function load(path: string): Promise<Core.Config> {
  return jsonfile.readFile(path);
}

export async function save(path: string, config: Core.Config) {
  return jsonfile.writeFile(path, config, { spaces: 2 });
}

export async function make(_path: string) {}
