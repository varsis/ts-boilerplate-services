import { Connection } from 'typeorm'
import { DatabaseService } from '../../src/services/database'
import * as TYPEORM_CONNECTION_OPTIONS from '../../src/cfg/database'

export class DatabaseSpace {

  private static _connection: Promise<Connection>

  constructor() {
    DatabaseSpace._connection = DatabaseService.connect({ ...TYPEORM_CONNECTION_OPTIONS, migrationsRun: true, name: 'test' })
  }

  get connection(): Promise<Connection> {
    return DatabaseSpace._connection
  }
}
