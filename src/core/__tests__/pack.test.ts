// tslint:disable: no-implicit-dependencies
import * as fs from 'fs';
import {
  cleanupTempDirs,
  copyFixtureIntoTempDir,
} from 'jest-fixtures';
import * as path from 'path';
import * as util from 'util';

import { load } from '../../config';
import { Core } from '../../interfaces';
import {
  setFileVersion,
  setVersion,
} from '../pack';

jest.unmock('jsonfile');

const status = util.promisify(fs.stat);
const readFile = util.promisify(fs.readFile);

const fileCompare = async (path1: string, path2: string): Promise<boolean> => {
  const file1 = await readFile(path1);
  const file2 = await readFile(path2);

  return file1 === file2;
};

describe('setFileVersion', () => {
  it('should switch version of file with symlink mode', async () => {
    const temp: string = await copyFixtureIntoTempDir(__dirname, 'pack');
    const config: Core.Config = await load(path.join(temp, 'nfvm.json'));

    const file1 = config.packs[0].files.find(item => item.filename === 'file1');

    expect(file1).toBeDefined();

    if (file1) {
      const v2 = file1.versions.find(item => item.alias === 'v2');

      expect(v2).toBeDefined();

      if (v2) {
        await setFileVersion(file1, 'v2');

        const file1Status = await status(path.join(temp, file1.path, file1.filename));
        const same: boolean = await fileCompare(
          path.join(temp, file1.path, file1.filename),
          path.join(temp, v2.path, file1.filename),
        );

        expect(same).toBe(true);
        expect(file1Status.isSymbolicLink()).toBe(true);
      }
    }
  });

  it('should switch version of file with mv mode', async () => {
    const temp: string = await copyFixtureIntoTempDir(__dirname, 'pack');
    const config: Core.Config = await load(path.join(temp, 'nfvm.json'));

    const file2 = config.packs[0].files.find(item => item.filename === 'file2');

    expect(file2).toBeDefined();

    if (file2) {
      const v1 = file2.versions.find(item => item.alias === 'v1');

      expect(v1).toBeDefined();

      if (v1) {
        await setFileVersion(file2, 'v1');

        const file2Status = await status(path.join(temp, file2.path, file2.filename));
        const same: boolean = await fileCompare(
          path.join(temp, file2.path, file2.filename),
          path.join(temp, v1.path, file2.filename),
        );

        expect(same).toBe(true);
        expect(file2Status.isFile()).toBe(true);
      }
    }
  });

  it('should remove file if version does not exist', async () => {
    const temp: string = await copyFixtureIntoTempDir(__dirname, 'pack');
    const config: Core.Config = await load(path.join(temp, 'nfvm.json'));

    const file2 = config.packs[0].files.find(item => item.filename === 'file2');

    expect(file2).toBeDefined();

    if (file2) {
      const v2 = file2.versions.find(item => item.alias === 'v2');

      expect(v2).toBeUndefined();

      if (!v2) {
        await setFileVersion(file2, 'v2');

        try {
          await status(path.join(temp, file2.path, file2.filename));
        } catch (error) {
          expect(error.code).toBe('ENOENT');
        }
      }
    }
  });

  it('should leave file if version does not exist', async () => {
    const temp: string = await copyFixtureIntoTempDir(__dirname, 'pack');
    const config: Core.Config = await load(path.join(temp, 'nfvm.json'));

    const file1 = config.packs[0].files.find(item => item.filename === 'file1');

    expect(file1).toBeDefined();

    if (file1) {
      const v3 = file1.versions.find(item => item.alias === 'v3');

      expect(v3).toBeUndefined();

      if (!v3) {
        await setFileVersion(file1, 'v1');
        await setFileVersion(file1, 'v3');

        const file1Status = await status(path.join(temp, file1.path, file1.filename));

        expect(file1Status.isFile()).toBe(true);
      }
    }
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
      .toEqual(new Error('Version does not exist.'));
  });
});

afterAll(() => {
  cleanupTempDirs();
});
