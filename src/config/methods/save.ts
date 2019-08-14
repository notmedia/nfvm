import * as jsonfile from 'jsonfile';

import { Core } from '../../interfaces';

export async function save(path: string, config: Core.Config) {
  return jsonfile.writeFile(path, config, { spaces: 2 });
}
