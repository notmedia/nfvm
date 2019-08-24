// tslint:disable-next-line
import * as semver from 'semver';

import { getNfvmVersion } from '../../core';

describe('getNfvmVersion', () => {
  it('should be a string ', () => {
    const version: string = getNfvmVersion();

    expect(typeof version).toBe('string');
  });

  it('should be a valid version', () => {
    const version: string = getNfvmVersion();

    expect(semver.valid(version)).not.toBe(null);
  });
});
