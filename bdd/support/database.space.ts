import { Connection } from 'typeorm'
import { DatabaseService } from '../../src/services/database'
import * as TYPEORM_CONNECTION_OPTIONS from '../../src/cfg/database'

export class DatabaseSpace {
  public connection: Promise<Connection>

  constructor() {
    this.connection = DatabaseService.connect({ ...TYPEORM_CONNECTION_OPTIONS, migrationsRun: false, name: 'test' })
  }
}
