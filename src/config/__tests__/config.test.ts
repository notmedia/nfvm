jest.mock('jsonfile');

import * as jsonfile from 'jsonfile';

import { load, make, save } from '../../config';
import { Core } from '../../interfaces';

describe('load', () => {
  it('should load config from giving path', async () => {
    jsonfile.test();
    const config = await load('');
    expect(config).toBe(true);
  });
});

describe('save', () => {
  it('should save config at giving path', async () => {
    const config = await save({} as Core.Config, '');
    expect(config).toBe(true);
  });
});

describe('make', () => {
  it('should make config for giving path', async () => {
    const config = await make('');
    expect(config).toBe(true);
  });
});

afterAll(() => {
  jest.unmock('jsonfile');
});
