import * as path from 'path'
import { CONFIG } from './index'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

const TYPEORM_CONNECTION_OPTIONS: MysqlConnectionOptions = {
  type: CONFIG.DATABASE_TYPE || '',
  logging: CONFIG.DATABASE_LOGGING || false,
  timezone: 'Z', // Cast dates to UTC
  connectTimeout: 1000,
  debug: CONFIG.DEBUG, // Debug Mode
  migrationsRun: true, // Always run migrations

  username: CONFIG.DATABASE_USER || '',
  password: CONFIG.DATABASE_PASSWORD || '',
  database: CONFIG.DATABASE || '',
  host: CONFIG.DATABASE_HOST,
  port: CONFIG.DATABASE_PORT,

  entities: [path.join(__dirname, `../entity/*.${CONFIG.EXTENSION}`)],
  subscribers: [path.join(__dirname, `../subscribers/*.${CONFIG.EXTENSION}`)],
  migrations: [path.join(__dirname, `../migrations/*.${CONFIG.EXTENSION}`)],
}

export = TYPEORM_CONNECTION_OPTIONS
