import * as path from 'path'
import { map, without } from 'ramda'
import { before, binding } from 'cucumber-tsflow'
import { getRepository } from "typeorm";
import { server } from '../../src/app'
import * as log from 'menna'
import { DatabaseService } from '../../src/services/database'
import { DatabaseSpace } from './database.space'
import * as TYPEORM_CONNECTION_OPTIONS from '../../src/cfg/database'

@binding([DatabaseSpace])
class DatabaseSupport {

  private umzug

  constructor(
    private databaseSpace: DatabaseSpace,
  ) {}

  @before()
  public async beforeAllMigrations(): Promise<void> {
    return this.databaseSpace.connection
      .then(c => c.runMigrations())
  }

  @before()
  public async beforeAllTruncateTables(): Promise<any> {
    return this.truncateTables()
  }

  private async truncateTables(): Promise<any> {
    const connection = await this.databaseSpace.connection
    const promises = connection.entityMetadatas.map(entity => getRepository(entity.name).clear())
    return Promise.all(promises)
  }
}

export = DatabaseSupport
