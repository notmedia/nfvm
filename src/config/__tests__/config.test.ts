jest.mock('jsonfile');

import * as jsonfile from 'jsonfile';

import { load, save } from '../../config';
import { Core } from '../../interfaces';

const MOCK_CONFIG: Core.Config = {
  packs: [],
};

const MOCK_FILE_INFO = [{
  data: MOCK_CONFIG,
  path: 'nfvm.json',
}];

beforeEach(() => {
  jsonfile.__setMockFiles(MOCK_FILE_INFO);
});

describe('load', () => {
  it('should load config from giving path', async () => {
    const config: Core.Config = await load('nfvm.json');
    expect(config.packs).toStrictEqual([]);
  });

  it('should throw error for unexpected path', () => {
    expect.assertions(1);
    expect(load('test.json')).rejects.toBeInstanceOf(Error);
  });
});

describe('save', () => {
  it('should save config at giving path', async () => {
    await save('test.json', MOCK_CONFIG);
    const config: Core.Config = await load('test.json');
    expect(config.packs).toStrictEqual([]);
  });
});

// describe('make', () => {
//   it('should make config for giving path', async () => {
//     const config = await make('');
//     expect(config).toBe(true);
//   });
// });

afterAll(() => {
  jest.unmock('jsonfile');
});
