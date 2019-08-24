// tslint:disable-next-line: no-implicit-dependencies
// import { copyFixtureIntoTempDir } from 'jest-fixtures';

import { Core } from '../../interfaces';
import {
  // setFileVersion,
  setVersion,
} from '../pack';

describe('setFileVersion', () => {
  it('should switch version of file', async () => {
    // const temp: string = await copyFixtureIntoTempDir(__dirname, 'pack');
  });
});

describe('setVersion', () => {
  it('should switch version of pack', async () => {
    let pack: Core.Pack = {
      alias: 'testPack',
      availableVersions: ['default', 'test'],
      files: [],
      version: 'default',
    };

    pack = await setVersion(pack, 'test');

    expect(pack.version).toBe('test');
  });

  it('should throw error for undefined version', () => {
    const pack: Core.Pack = {
      alias: 'testPack',
      availableVersions: ['default'],
      files: [],
      version: 'default',
    };

    expect.assertions(1);
    expect(setVersion(pack, 'undefined_version'))
      .rejects
      .toEqual(new Error('Version does not exists.'));
  });
});
