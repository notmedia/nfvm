import { CLI } from '../../interfaces';
import { check } from '../../cli/args';

describe('check', () => {
  it('should return true for valid arguments', () => {
    const argv = {} as CLI.Argv;

    expect(check(argv)).toBe(true);
  });
});
