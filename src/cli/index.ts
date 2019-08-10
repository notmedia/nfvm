import yargs from 'yargs';

import { CLI } from '../interfaces';
import * as args from './args';

export async function run() {}

export function build(raw: string[] = process.argv.slice(2)): CLI.Argv {
  const argv: CLI.Argv = yargs(raw)
    .options(args.options)
    .check(args.check)
    .argv;

  return Object.keys(argv).reduce((value, key) => {
    if (!key.includes('-')) {
      value[key] = argv[key];
    }

    return value;
  }, {} as CLI.Argv);
}
