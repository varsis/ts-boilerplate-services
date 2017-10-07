import menna from 'menna'
import { concat, defaultTo } from 'ramda'
import cfg from '~/cfg'
import { Config } from './cfg.interface'

/**
 * Check some environment variables to make the application to fail as early as possible
 */
interface ConfigVars {
  [key: string]: string[]
  default: string[]
}

// variables that if missing would prevent the app from working at all
const MANDATORY_CONFIG_VARS: ConfigVars = {
  default: [
    'PORT',
    'DATABASE',
    'DATABASE_HOST',
    'DATABASE_DIALECT',
    'DATABASE_USER',
  ],
  production: [
    'API_KEY',
    'DATABASE_PASSWORD',
  ],
}
// variables that if missing would reduce some mission critical functionalities
const FUNCTIONAL_CONFIG_VARS: ConfigVars = {
  default: [],
}

const emptyArrayOr: (arr: string[]) =>
  string[] = defaultTo<string[]>([])

const falsy = (obj: any, key: string) =>
  (obj[key] === undefined || obj[key] === '' || obj[key] === null)

const getRequiredVars = (vars: ConfigVars) =>
  concat(vars.default, emptyArrayOr(vars[process.env.NODE_ENV as string]))

const getMissingVars = (config: Config, keys: string[]) =>
  keys.filter(k => falsy(config, k))

const logMissingVar = (config: Config, key: string, logger: (input: string) => void) =>
  logger(`Expected environment variable ${key} to exist but found: ${config[key]}`)

module.exports = (config = cfg, mandatoryConfigVars = getRequiredVars(MANDATORY_CONFIG_VARS)) => {
  const missingMandatoryVars = getMissingVars(config, mandatoryConfigVars)
  const missingFunctionalVars = getMissingVars(config, getRequiredVars(FUNCTIONAL_CONFIG_VARS))

  if (missingMandatoryVars.length) {
    missingMandatoryVars.forEach((v: string) => logMissingVar(config, v, menna.error))
    menna.error('Refusing to start up due to missing environment variables')
  }

  if (missingFunctionalVars.length) {
    missingFunctionalVars.forEach((v: string) => logMissingVar(config, v, menna.warn))
    menna.warn('Some functionality might be lost due to missing environment variables')
  }

  return missingMandatoryVars.length > 0
}
