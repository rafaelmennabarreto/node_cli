import { GluegunCommand, GluegunPrint } from 'gluegun'
import { exec } from 'child_process'
import { promisify } from 'util'
const rimraf = require('rimraf')

const nodeTypescript = 'https://github.com/rafaelmennabarreto/Template_NodeTs.git'
const nodeJs = 'https://github.com/rafaelmennabarreto/nodeJs_Template.git';

const command: GluegunCommand = {
  name: 'new',
  run: async toolbox => {
    
    const { print, parameters } = toolbox
    const folder = parameters.first
    const {ts, h, help} = parameters.options

    if(h || help){
      details(print);
      return;
    }

    if (!folder) {
      print.error('Please epecify the project name')
      return      
    }
   
    const spinner = print.spin('Creating the ' + folder + ' App');

    const url = ts ? nodeTypescript : nodeJs;    
    await cloneGithubBaseProject(print, promisify, exec, rimraf, folder, url);
    spinner.stop()
    print.warning('If you use yarn open the project folder and run the command yarn')
    print.warning('If you use npm open the project folder and run the command npm install')
    return;
  }
}

function details(print: GluegunPrint){
  print.info("Run node-cli new without parameter to generate a project with Javascript")
  print.info("--ts : to generate a project with Typescript")

}

async function cloneGithubBaseProject(
  print:GluegunPrint, 
  promiseGenerator:Function , 
  exec: Function, 
  rimraf: any,
  folder: String,
  projectUrl: String
) {
  const run = promiseGenerator(exec)

    try {
      await run(`git clone ${projectUrl} ${folder}`)
    } catch (err) {
      print.error('\n' + err)
      return
    }

    try {
      await run(`cd ${folder}`)
    } catch (err) {
      print.error('\n' + err)
      return
    }
    rimraf('.git', (err: any) => {
      if (err) {
        print.error('\n' + err)
        return
      }

      print.success('app created')
    })
}

module.exports = command
