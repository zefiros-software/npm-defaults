import { Command } from '@oclif/command'
import execa from 'execa'
import Lint from '~/commands/lint'

export class CI extends Command {
    public static description = 'run all ci tests'

    public commands = ['install', 'lint', 'build', 'test']

    public async run() {
        await Lint.run([])
        for (const command of this.commands) {
            await this.runCommand(command)
        }
    }

    public async runCommand(command: string) {
        const subprocess = execa('yarn', [command])
        subprocess.stderr!.pipe(process.stderr)
        subprocess.stdout!.pipe(process.stdout)
        const { exitCode } = await subprocess
        this.log(`Exited with code ${exitCode}`)
    }
}

export default CI
