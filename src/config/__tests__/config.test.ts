import { load, save } from '../../config';

describe('load', () => {
  it('should load config', async () => {
    const config = await load();

    expect(config);
  });
});

describe('save', () => {
  it('should save config', async () => {
    const config = await save();

    expect(config);
  });
});
