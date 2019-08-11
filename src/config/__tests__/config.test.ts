import { load, make, save } from '../../config';
import { Core } from '../../interfaces';

describe('load', () => {
  it('should load config', async () => {
    const config = await load('');
    expect(config).toBe(true);
  });
});

describe('save', () => {
  it('should save config', async () => {
    const config = await save([{} as Core.Pack]);
    expect(config).toBe(true);
  });
});

describe('make', () => {
  it('should make config for path', async () => {
    const config = await make('');
    expect(config).toBe(true);
  });
});
