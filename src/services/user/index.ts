import { Service } from 'ts-express-decorators'
import { Repository } from 'typeorm'
import { RepositoryFactory } from '../../models/factory'
import { User } from '../../models/User'
import { UserNotFound } from '../../errors'
import { IUserCreateRequest, IUserUpdateRequest } from '../../interfaces'

@Service()
export class UserService {
  public userRepo: Repository<User>
  constructor(
    private repos: RepositoryFactory,
  ) {
    this.userRepo = repos.User
  }

  public async create(user: IUserCreateRequest): Promise<User> {
    const createUser = this.userRepo.create(user)
    return createUser.save()
  }
  public async update(id: string, userUpdate: IUserUpdateRequest): Promise<User> {
    const user = await this.get(id)
    await this.userRepo.update({ id }, userUpdate)
    const updatedUser = await this.get(id)
    return updatedUser
  }
  public async list(pageNumber: number, pageSize: number): Promise<User[]> {
    return this.userRepo.find({
      take: pageSize,
      skip: pageNumber * pageSize,
    })
  }
  public async delete(id: string): Promise<void> {
    await (await this.get(id)).remove()
  }
  public async get(id: string): Promise<User> {
    const user = await this.userRepo.findOne({ id })
    if (!user) throw new UserNotFound()
    return user
  }
}
