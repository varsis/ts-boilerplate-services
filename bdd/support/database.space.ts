import { Sequelize } from 'sequelize-typescript'
import { DatabaseService } from '../../src/services/database'
import * as TYPEORM_CONNECTION_OPTIONS from '../../src/cfg/database'

export class DatabaseSpace {
  public sequelize: Sequelize

  constructor() {
    this.sequelize = DatabaseService.connect(TYPEORM_CONNECTION_OPTIONS)
  }
}
