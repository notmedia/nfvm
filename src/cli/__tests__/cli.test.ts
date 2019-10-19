import { build } from '../cli';

describe('build', () => {
  it('should return only camelcased args ', () => {
    const mockProcessArgv = jest
      // @ts-ignore
      .spyOn(process.argv, 'slice')
      .mockImplementation(() => ['--jest-test']);

    const cli = build();
    expect(cli).not.toHaveProperty('jest-test');
    expect(cli).toHaveProperty('jestTest');
    mockProcessArgv.mockRestore();
  });
});
