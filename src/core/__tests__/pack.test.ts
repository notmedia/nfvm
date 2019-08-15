import { Core } from '../../interfaces';
import { setVersion } from '../pack';

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
