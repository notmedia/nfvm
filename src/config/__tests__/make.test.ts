// tslint:disable: no-implicit-dependencies
import * as fs from 'fs';
import {
  cleanupTempDirs,
  copyFixtureIntoTempDir,
} from 'jest-fixtures';
import { join } from 'path';
import * as util from 'util';

import { Core } from '../../interfaces';
import {
  getFilesFromDirectory,
  getSubDirectories,
  groupFilesByVersion,
  makeConfig,
  makePack,
  mapFilenameToPath,
} from '../methods/make';

jest.unmock('jsonfile');

const status = util.promisify(fs.stat);

describe('getSubDirectories', () => {
  it('should return all sub directories from given path', async () => {
    const temp: string = await copyFixtureIntoTempDir(__dirname, 'make-fixture');
    const directories: string[] = await getSubDirectories(temp);

    expect(directories.length).toEqual(2);
  });
});

describe('getFilesFromDirectory', () => {
  it('should return all files from given path', async () => {
    const temp: string = await copyFixtureIntoTempDir(__dirname, 'make-fixture');
    const directories: string[] = await getSubDirectories(temp);
    const files: string[] = await getFilesFromDirectory(directories[0]);

    expect(files.length).toEqual(2);
  });
});

describe('mapFilenameToPath', () => {
  it('should return path for filename', () => {
    const path = mapFilenameToPath('test', [{ filename: 'test', path: 'testpath'}]);

    expect(path).toBe('testpath');
  });

  it('should return empty path for filename which does not exist', () => {
    const path = mapFilenameToPath('file', [{ filename: 'test', path: 'testpath'}]);

    expect(path).toBe('');
  });
});

describe('groupFilesByVersion', () => {
  it('should return grouped files by version', () => {
    const files: Core.File[] = [
      {
        filename: 'file1',
        mode: 'symlink',
        path: '',
        removeIfVersionNotExists: true,
        versions: [
          {
            alias: 'v1',
            path: '/tmp/jest-fixture-E7wSn8/v1',
          },
        ],
      },
      {
        filename: 'file2',
        mode: 'symlink',
        path: '',
        removeIfVersionNotExists: true,
        versions:  [
          {
            alias: 'v1',
            path: '/tmp/jest-fixture-E7wSn8/v1',
          },
        ],
      },
      {
        filename: 'file1',
        mode: 'symlink',
        path: '',
        removeIfVersionNotExists: true,
        versions: [
          {
            alias: 'v2',
            path: '/tmp/jest-fixture-E7wSn8/v2',
          },
        ],
      },
    ];

    const groupedFiles: Core.File[] = groupFilesByVersion(files);

    expect(groupedFiles.length).toBe(2);

    const file1 = groupedFiles.find(file => file.filename === 'file1');
    const file2 = groupedFiles.find(file => file.filename === 'file2');

    expect(file1).toBeDefined();
    expect(file2).toBeDefined();

    if (file1 && file2) {
      expect(file1.versions.length).toBe(2);
      expect(file2.versions.length).toBe(1);
    }
  });
});

describe('makePack', () => {
  it('should return valid pack', async () => {
    const temp: string = await copyFixtureIntoTempDir(__dirname, 'make-fixture');

    const pack: Core.Pack = await makePack(temp, 'testMake');

    expect(pack.alias).toBe('testMake');
    expect(['v1', 'v2'].includes(pack.version)).toBe(true);
    expect(pack.availableVersions.length).toBe(2);
    expect(pack.availableVersions.includes('v1')).toBe(true);
    expect(pack.availableVersions.includes('v2')).toBe(true);
    expect(pack.files.length).toBe(2);
    expect(pack.files.filter(file => file.mode === 'symlink').length).toBe(2);
    expect(pack.files.filter(file => file.removeIfVersionNotExists).length).toBe(2);

    const file1 = pack.files.find(item => item.filename === 'file1');
    const file2 = pack.files.find(item => item.filename === 'file2');

    expect(file1).toBeDefined();
    expect(file2).toBeDefined();

    if (file1 && file2) {
      const file1v1 = file1.versions.find(item => item.alias === 'v1');
      const file2v1 = file2.versions.find(item => item.alias === 'v1');

      expect(file1v1).toBeDefined();
      expect(file2v1).toBeDefined();

      if (file1v1 && file2v1) {
        const file1Status = await status(join(file1v1.path, file1.filename));
        const file2Status = await status(join(file2v1.path, file2.filename));

        expect(file1Status.isFile()).toBe(true);
        expect(file2Status.isFile()).toBe(true);
      }
    }
  });

  it('should return valid pack with maped file paths', async () => {
    const temp: string = await copyFixtureIntoTempDir(__dirname, 'make-fixture');

    const map = [
      {
        filename: 'file1',
        path: 'testpath1',
      },
      {
        filename: 'file2',
        path: 'testpath2',
      },
    ];

    const pack: Core.Pack = await makePack(temp, 'testMake', map);

    expect(pack.alias).toBe('testMake');
    expect(['v1', 'v2'].includes(pack.version)).toBe(true);
    expect(pack.availableVersions.length).toBe(2);
    expect(pack.availableVersions.includes('v1')).toBe(true);
    expect(pack.availableVersions.includes('v2')).toBe(true);
    expect(pack.files.length).toBe(2);
    expect(pack.files.filter(file => file.mode === 'symlink').length).toBe(2);
    expect(pack.files.filter(file => file.removeIfVersionNotExists).length).toBe(2);

    const filenames = pack.files.map(file => file.filename);

    expect(filenames.includes('file1')).toBe(true);
    expect(filenames.includes('file2')).toBe(true);

    const paths = pack.files.map(file => file.path);

    expect(paths.includes('testpath1')).toBe(true);
    expect(paths.includes('testpath2')).toBe(true);
  });
});

describe('makeConfig', () => {
  it('should return valid config', async () => {
    const temp: string = await copyFixtureIntoTempDir(__dirname, 'make-fixture');

    const config: Core.Config = await makeConfig([{path: temp, alias: 'testMake'}]);

    expect(config.packs.length).toBe(1);
    expect(config.packs[0].alias).toBe('testMake');
  });
});

afterAll(() => {
  cleanupTempDirs();
});
