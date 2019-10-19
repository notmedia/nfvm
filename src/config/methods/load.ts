import * as jsonfile from 'jsonfile';

import { Core } from '../../interfaces';

export function load(path: string): Promise<Core.Config> {
  return jsonfile.readFile(path);
}
