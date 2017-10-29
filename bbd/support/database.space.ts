import { Sequelize } from 'sequelize-typescript'
import { DatabaseService } from '../../src/services/database'
import * as SEQUELIZE_CONFIG from '../../src/cfg/database'

export class DatabaseSpace {
  public sequelize: Sequelize

  constructor() {
    this.sequelize = DatabaseService.connect(SEQUELIZE_CONFIG)
  }
}
