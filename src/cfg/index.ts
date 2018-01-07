import { Config } from './cfg.interface'
import './dotenv'

const DEFAULT_DATABASE_PORT = '3306'
const DEFAULT_EXTENSION = 'js'
const INT_BASE = 10

export const CONFIG: Config = {
  DEBUG: process.env.DEBUG,

  EXTENSION: process.env.EXTENSION || DEFAULT_EXTENSION,

  PORT: process.env.PORT,
  VERSION: process.env.VERSION,

  DATABASE: process.env.DATABASE,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT || DEFAULT_DATABASE_PORT, INT_BASE),
  DATABASE_TYPE: process.env.DATABASE_TYPE,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_LOGGING: process.env.DATABASE_LOGGING,

  API_KEY: process.env.API_KEY,

  HANDLER_DEFAULTS: {
    pageSize: 20,
    contentType: 'application/json',
  },

}

export default CONFIG
