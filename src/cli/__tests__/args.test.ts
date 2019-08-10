import { CLI } from '../../interfaces';
import { check } from '../../cli/args';

describe('check args', () => {
  it('should return true if the arguments are valid', () => {
    const argv = {} as CLI.Argv;

    expect(check(argv)).toBe(true);
  });
});
