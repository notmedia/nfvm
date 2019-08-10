import * as semver from 'semver';

import { getVersion } from '../../core';

describe('getVersion', () => {
  it('should be a string ', () => {
    const version: String = getVersion();

    expect(typeof version).toBe('string');
  });

  it('should be a valid version', () => {
    const version: String = getVersion();

    expect(semver.valid(version)).not.toBe(null);
  })
});
