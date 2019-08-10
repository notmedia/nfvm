import * as pkg from '../../package.json';

export function getVersion(): string {
  return pkg.version;
}
