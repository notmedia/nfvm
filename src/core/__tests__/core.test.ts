import * as semver from 'semver';

import { getVersion } from '../../core';

describe('getVersion', () => {
  it('should be a string ', () => {
    const version: string = getVersion();

    expect(typeof version).toBe('string');
  });

  it('should be a valid version', () => {
    const version: string = getVersion();

    expect(semver.valid(version)).not.toBe(null);
  });
});
