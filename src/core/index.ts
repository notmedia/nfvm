// Require for correct ts build!
// tslint:disable-next-line
const { version } = require('../../package.json');

export function getVersion(): string {
  return version;
}
