jest.mock('jsonfile');

import * as jsonfile from 'jsonfile';

import { load } from '../../config';
import { Core } from '../../interfaces';

describe('load', () => {
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

  it('should load config from giving path', async () => {
    const config: Core.Config = await load('nfvm.json');
    expect(config.packs).toStrictEqual([]);
  });

  it('should throw error for unexpected path', () => {
    expect(load('test.json')).rejects.toBeInstanceOf(Error);
  });
});

// describe('save', () => {
//   it('should save config at giving path', async () => {
//     const config = await save({} as Core.Config, '');
//     expect(config).toBe(true);
//   });
// });

// describe('make', () => {
//   it('should make config for giving path', async () => {
//     const config = await make('');
//     expect(config).toBe(true);
//   });
// });

afterAll(() => {
  jest.unmock('jsonfile');
});
