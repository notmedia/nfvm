import yargs from 'yargs';

import { CLI } from '../interfaces';
import * as args from './args';

export async function run() {
  try {
    build();
  } catch (error) {
    process.exit(1);
    throw error;
  }
}

export function build(raw: string[] = process.argv.slice(2)): CLI.Argv {
  const y = yargs(raw)
    .commandDir('./commands')
    .options(args.options);

  const argv: CLI.Argv = y
    .check(args.check)
    .argv;

  return Object.keys(argv).reduce((value, key) => {
    if (!key.includes('-')) {
      value[key] = argv[key];
    }

    return value;
  }, {} as CLI.Argv);
}
