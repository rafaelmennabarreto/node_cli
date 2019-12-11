import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'node-cli',
  run: async toolbox => {
    const { print } = toolbox

    print.info('Welcome to node cli')
    print.info('avaliabe commands')
    print.info('  new : utilized to create a project, use --help or -h to see the options');
  }
}

module.exports = command
