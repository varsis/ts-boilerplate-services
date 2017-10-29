import { Config } from './cfg.interface'
import './dotenv'

const DEFAULT_DATABASE_PORT = '5432'
const DEFAULT_EXTENSION = 'js'
const INT_BASE = 10

export const CONFIG: Config = {
  EXTENSION: process.env.EXTENSION || DEFAULT_EXTENSION,

  PORT: process.env.PORT,

  DATABASE: process.env.DATABASE,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT || DEFAULT_DATABASE_PORT, INT_BASE),
  DATABASE_DIALECT: process.env.DATABASE_DIALECT,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,

  API_KEY: process.env.API_KEY,

  HANDLER_DEFAULTS: {
    pageSize: 20,
    contentType: 'application/json',
  },

  DISABLE_SEQUELIZE_LOGGING: Boolean(JSON.parse(process.env.DISABLE_SEQUELIZE_LOGGING || 'false')),
}

export default CONFIG
