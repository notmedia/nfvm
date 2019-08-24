// tslint:disable: no-implicit-dependencies
import {
  cleanupTempDirs,
  copyFixtureIntoTempDir,
} from 'jest-fixtures';
import * as path from 'path';

import { load } from '../../config';
import { Core } from '../../interfaces';
import {
  setFileVersion,
  setVersion,
} from '../pack';

jest.unmock('jsonfile');

describe('setFileVersion', () => {
  it('should switch version of file', async () => {
    const temp: string = await copyFixtureIntoTempDir(__dirname, 'pack');
    const config: Core.Config = await load(path.join(temp, 'nfvm.json'));
    await setFileVersion(config.packs[0].files[0], 'v2');
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

afterAll(() => {
  cleanupTempDirs();
});
