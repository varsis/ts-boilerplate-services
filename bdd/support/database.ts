import * as path from 'path'
import { map, without } from 'ramda'
import { after, before, binding } from 'cucumber-tsflow'
import { getRepository } from 'typeorm'
import { server } from '../../src/app'
import * as log from 'menna'
import { DatabaseService } from '../../src/services/database'
import { DatabaseSpace } from './database.space'
import * as TYPEORM_CONNECTION_OPTIONS from '../../src/cfg/database'

@binding([DatabaseSpace])
class DatabaseSupport {

  constructor(
    private databaseSpace: DatabaseSpace,
  ) {}

  @before()
  public async beforeAllTruncateTables(): Promise<void> {
    await this.truncateTables()
  }

  private async truncateTables(): Promise<void> {
    const connection = await this.databaseSpace.connection
    await connection.query('SET FOREIGN_KEY_CHECKS=0;')

  const promises = connection.entityMetadatas
    .map(entity => connection.getRepository(entity.name).clear())
  await Promise.all(promises)

    await connection.query('SET FOREIGN_KEY_CHECKS=1;')
  }
}

export = DatabaseSupport
