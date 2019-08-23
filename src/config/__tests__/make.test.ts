// tslint:disable-next-line: no-implicit-dependencies
import { copyFixtureIntoTempDir } from 'jest-fixtures';

import { Core } from '../../interfaces';
import { getFilesFromDirectory, getSubDirectories, makeConfig, makePack } from '../methods/make';

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

describe('makePack', () => {
  it('should return valid pack', async () => {
    const temp: string = await copyFixtureIntoTempDir(__dirname, 'make-fixture');

    const pack: Core.Pack = await makePack(temp, 'testMake');

    expect(pack.alias).toBe('testMake');
    expect(pack.version).toBe('v1');
    expect(pack.availableVersions.length).toBe(2);
    expect(pack.availableVersions).toBe(['v1', 'v2']);
    expect(pack.files.length).toBe(2);
    expect(pack.files.filter(file => file.mode === Core.SwitchMode.SYMLINK).length).toBe(2);
    expect(pack.files.filter(file => file.removeIfVersionNotExists).length).toBe(2);
    expect(pack.files.map(file => file.filename)).toBe(['file1', 'file2']);
  });
});

describe('makeConfig', () => {
  it('should return valid config', async () => {
    const temp: string = await copyFixtureIntoTempDir(__dirname, 'make-fixture');

    const config: Core.Config = await makeConfig([{path: temp, alias: 'testMake'}]);

    expect(config.packs.length).toBe(1);
  });
});
