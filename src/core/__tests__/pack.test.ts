import { Core } from '../../interfaces';
import { setVersion } from '../pack';

describe('setVersion', () => {
  it('should switch version of pack', () => {
    const pack: Core.Pack = setVersion({} as Core.Pack, 'test');

    expect(pack.version).toBe('test');
  });

  it('should throw error for undefined version', () => {
    expect(() => {
      setVersion({} as Core.Pack, 'undefined_version');
    }).toThrow();
  });
});
