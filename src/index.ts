// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { bin } from '../package.json'

import ci from '~/commands/ci'
import create from '~/commands/create'
import env from '~/commands/env'
import lint from '~/commands/lint'
import makeRelease from '~/commands/make-release'
import release from '~/commands/release'
import { setConfigurationKey } from '~/common/config'
import { PackageType } from '~/common/type'

import yargs from 'yargs'
import {install} from 'source-map-support'



export async function run() {
    install()

    return yargs
        .scriptName(Object.keys(bin)[0])
        .command(ci)
        .command(create)
        .command(env)
        .command(lint)
        .command(release)
        .command(makeRelease)
        .demandCommand()
        .help().argv
}

export { ci, create, env, lint, makeRelease, release, PackageType, setConfigurationKey }
