import { ISequelizeConfig, Sequelize } from 'sequelize-typescript'
import { Service } from 'ts-express-decorators'

@Service()
export class DatabaseService {

  private static instance: Sequelize
  public static connect(config: ISequelizeConfig): Sequelize {
    if (!this.instance) {
      this.instance = new Sequelize(config)
    }
    return this.instance
  }

  public instance(): Sequelize {
    if (!DatabaseService.instance) {
      throw new Error('Instance not initialised')
    }
    return DatabaseService.instance
  }
}
