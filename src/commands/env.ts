import execa from 'execa'
import type { Argv } from 'yargs'
import { satisfies } from 'semver'

interface PackageJsonDependencies {
    globalDependencies: Record<string, string>
}

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
const { globalDependencies }: PackageJsonDependencies = require('../../package.json')

export async function install(update: boolean, dependencies: readonly string[] = []): Promise<void> {
    type InstalledDependencies = Record<string, { version?: string } | undefined>
    let installedDeps: InstalledDependencies | undefined

    if (!update) {
        try {
            const { stdout } = await execa('npm', ['-g', '-j', 'ls'])
            const { dependencies: deps } = JSON.parse(stdout ?? '{}') as { dependencies: InstalledDependencies }
            installedDeps = deps
        } catch (err) {
            // The command may throw on "missing peerDependencies", but the output may still be useful
            try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                const { dependencies: deps } = JSON.parse((err.stdout as string) ?? '{}') as {
                    dependencies: InstalledDependencies
                }
                installedDeps = deps
            } catch (e) {
                installedDeps = {}
            }
        }
    } else {
        // pretend nothing is installed
        installedDeps = {}
    }

    await execa(
        'npm',
        [
            'install',
            '-g',
            ...[
                ...Object.entries(globalDependencies).map(([pkg, version]: readonly [string, string]) => `${pkg}@${version}`),
                ...dependencies,
            ].filter((dep) => {
                const [, name, version] = /^(@?.+)(?:@(.*)$)/.exec(dep) ?? []
                const installedVersion = installedDeps?.[name]?.version
                return version === undefined || installedVersion === undefined || !satisfies(installedVersion, version)
            }),
        ],
        {
            stdio: 'inherit',
        }
    )
}

export function builder(yargs: Argv) {
    return yargs
        .option('install', {
            describe: 'install the environment',
            type: 'boolean',
            default: false,
            requiresArg: false,
            demand: true,
        })
        .option('update', {
            describe: 'forces an update of all packages, even if a correct version is already present',
            type: 'boolean',
            default: false,
            requiresArg: false,
        })
}

export async function handler(argv: ReturnType<typeof builder>['argv']): Promise<void> {
    if (argv.install) {
        await install(argv.update)
    }
}

export default {
    command: 'env',
    describe: 'provision global environment',
    builder,
    handler,
}
