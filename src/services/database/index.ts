import { createConnection, Connection, ConnectionOptions } from 'typeorm'
import { Service } from 'ts-express-decorators'

@Service()
export class DatabaseService {

  private static instance: Connection
  public static connect(config: ConnectionOptions): Promise<Connection> {
    if (!this.instance) {
      return createConnection(config)
        .then(connection => this.instance = connection)
    }
    return Promise.resolve(this.instance)
  }

  public instance(): Connection {
    if (!DatabaseService.instance) {
      throw new Error('Instance not initialised')
    }
    return DatabaseService.instance
  }
}
