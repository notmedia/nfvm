// tslint:disable-next-line: no-implicit-dependencies
import { copyFixtureIntoTempDir } from 'jest-fixtures';

import { Core } from '../../interfaces';
import { getFilesFromDirectory, getSubDirectories, make } from '../methods/make';

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

describe('make', () => {
  it('should return valid config', async () => {
    const temp: string = await copyFixtureIntoTempDir(__dirname, 'make-fixture');

    const config: Core.Config = await make(temp, 'testMake');

    expect(config.packs.length).toBe(1);
    expect(config.packs[0].alias).toBe('testMake');
    expect(config.packs[0].version).toBe('v1');
    expect(config.packs[0].files.length).toBe(2);
    expect(config.packs[0].files.map(item => item.filename).includes('file1')).toBe(true);
    expect(config.packs[0].files[0].versions.map(item => item.alias)).toBe(['v1', 'v2']);
  });
});
