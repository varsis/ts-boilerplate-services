import * as path from 'path'
import { map, without } from 'ramda'
import { before, binding } from "cucumber-tsflow"
import { server } from '../../src/app'
import * as log from 'menna'
import { Sequelize } from 'sequelize-typescript'
import { DatabaseService } from '../../src/services/database'
import { DatabaseSpace } from './database.space'
import * as SEQUELIZE_CONFIG from '../../src/cfg/database'
import * as Umzug from 'umzug'

@binding([DatabaseSpace])
class DatabaseSupport {

  private umzug
  private sequelize: Sequelize

  constructor(
    databaseSpace: DatabaseSpace,
  ) {
    this.sequelize = databaseSpace.sequelize
    this.umzug = new Umzug({
      storage: 'sequelize',
      storageOptions: {
        sequelize: this.sequelize,
      },
      migrations: {
        params: [this.sequelize.getQueryInterface(), this.sequelize.constructor, function () {
          throw new Error(
            'Migration tried to use old-style "done" callback. Please return a promise instead.',
          )
        }],
        path: path.join(__dirname, '../../migrations'),
        pattern: /\.js$/,
      },
    })
  }

  @before()
  public async beforeAllMigrations(): Promise<void> {
    return this.migrations()
  }

  @before()
  public async beforeAllTruncateTables(): Promise<any> {
    return this.truncateTables()
  }

  private async truncateTables(): Promise<any> {
    log.debug('Cleaning up...')
    const promises = []
    const models = without(['SequelizeMeta'], Object.keys(this.sequelize.models))
    return Promise.all(models.map(model => this.sequelize.models[model].destroy({ truncate: true, cascade: true })))
  }

  private async migrations(): Promise<void> {
    const migrations = await this.umzug.up()
    const getMigrationNames = map((migration: any) => migration.file)
    const migrationNames = getMigrationNames(migrations)
    log.debug('Ran the following migrations:', migrationNames)
  }
}

export = DatabaseSupport
