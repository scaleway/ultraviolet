import { Command } from 'commander'
import { migrate } from './commands/migrate'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const packageJson = JSON.parse(
  readFileSync(join(process.cwd(), 'package.json'), 'utf-8'),
)
const program = new Command()

program.name('uv').description('Ultraviolet CLI').version(packageJson.version)

program
  .command('migrate')
  .description('Migrate from one version to another')
  .argument('<directory>', 'Directory from where to start the migration')
  .action((directory: string) => {
    migrate(directory)
  })

program.parse(process.argv)
