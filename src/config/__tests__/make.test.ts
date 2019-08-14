import { getSubDirectories } from '../methods/make';

describe('getSubDirectories', () => {
  it('should return all sub directories from given path', async () => {
    const paths = await getSubDirectories(process.cwd());

    // expect.assertions(1);
  });
});
