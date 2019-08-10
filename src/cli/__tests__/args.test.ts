import { check } from '../../cli/args';
import { CLI } from '../../interfaces';

describe('check', () => {
  it('should return true for valid arguments', () => {
    const argv = {} as CLI.Argv;

    expect(check(argv)).toBe(true);
  });
});
