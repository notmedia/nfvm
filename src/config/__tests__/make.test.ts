// tslint:disable-next-line: no-implicit-dependencies
import { copyFixtureIntoTempDir } from 'jest-fixtures';

import { getSubDirectories } from '../methods/make';

describe('getSubDirectories', () => {
  it('should return all sub directories from given path', async () => {
    const temp = await copyFixtureIntoTempDir(__dirname, 'make-fixture');
    const paths = await getSubDirectories(temp);

    expect(paths.length).toEqual(2);
  });
});
