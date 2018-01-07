import { Service } from 'ts-express-decorators'
import { User } from '../User'

@Service()
export class EntityFactory {
  public get User(): typeof User {
    return User
  }
}
