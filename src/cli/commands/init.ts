export function init(yargs) {
  yargs
    .command('test', 'test command', (_yargs) => {
      console.log('console.log init')
    })
}
