import * as path from 'path'
import { ISequelizeConfig } from 'sequelize-typescript'
import { Service } from 'ts-express-decorators'
import { CONFIG } from './index'

const SEQUELIZE_CONFIG: ISequelizeConfig = {
  modelPaths: [path.join(__dirname, '../models')],
  username: CONFIG.DATABASE_USER || '',
  password: CONFIG.DATABASE_PASSWORD || '',
  database: CONFIG.DATABASE || '',
  host: CONFIG.DATABASE_HOST,
  port: CONFIG.DATABASE_PORT,
  dialect: CONFIG.DATABASE_DIALECT,
  storage: 'sequelize',
}

export = SEQUELIZE_CONFIG
