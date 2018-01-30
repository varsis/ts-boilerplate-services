import { Service } from 'ts-express-decorators'
import { Repository } from 'typeorm'
import { User } from '../User'
import { DatabaseService } from '../../services/database'

@Service()
export class RepositoryFactory {

  constructor(
    private databaseService: DatabaseService,
  ){}

  public get User(): Repository<User> {
    return this.databaseService.instance().getRepository(User)
  }
}
